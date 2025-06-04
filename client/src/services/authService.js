import { AuthenticationDetails, CognitoUser, CognitoUserAttribute, CognitoUserPool } from "amazon-cognito-identity-js";
import conf from "../conf/conf";

export class AuthService {
    userPool;
    constructor(){
        const poolData = {
            UserPoolId: conf.cognitoUserPoolId,
            ClientId: conf.clientId,
        }
        this.userPool = new CognitoUserPool(poolData);
    }

    async registerUser({username, email, password}){
        return new Promise((resolve, reject) => {
            const attributeList = [
              new CognitoUserAttribute({
                  Name: 'email',
                  Value: email,
              }),
              new CognitoUserAttribute({
                  Name: 'name',
                  Value: username,
              })
            ];
            this.userPool.signUp(
              username,
              password,
              attributeList,
              null,
              function (err, result) {
                if (err) {
                    alert(err.message || JSON.stringify(err));
                    reject(err);
                    return;
                }
                var cognitoUser = result.user;
                console.log('user name is ' + cognitoUser.getUsername());
                resolve(result);
              }
            );
        })
    }

    async login({username, password}){
        return new Promise((resolve, reject) => {
            const cognitoUser = new CognitoUser({
              Username: username,
              Pool: this.userPool
            });
          
            const authDetails = new AuthenticationDetails({
              Username: username,
              Password: password
            });
          
            cognitoUser.authenticateUser(authDetails, {
              onSuccess: () => {
                const userDetails = this.getCognitoUserDetails();
                resolve(userDetails);
              },
              onFailure: (error) => {
                console.log(error);
                reject(error);
              }
            });
        });
    }

    async signOut() {
      await new Promise((resolve, reject) => {
        const cognitoUser = this.userPool.getCurrentUser();
        if(cognitoUser){
          cognitoUser.signOut((err, result) => {
            resolve();
            console.log("signOut");
          });
        }else{
          reject("user already signed Out")
        }
      }); 
    }

    async getCognitoUserDetails() {
      return new Promise((resolve, reject) => {
        const cognitoUser = this.userPool.getCurrentUser();

        if (!cognitoUser) {
          return reject(new Error("No authenticated user found"));
        }
      
        let userSession;
      
        cognitoUser.getSession((sessionError, session) => {
          if (sessionError) return reject(sessionError);
      
          userSession = session;
      
          cognitoUser.getUserAttributes((err, result) => {
            if (err) return reject(err);

            const userDetails = result.reduce((acc, attr) => {
              if(attr.Name === 'sub') {
                acc['userId'] = attr.Value;
              }else{
                acc[attr.Name] = attr.Value;
              }
              return acc;
            }, {});

            if(userSession && userSession.getAccessToken())
              userDetails["accessToken"] =  userSession.getAccessToken().getJwtToken();
              userDetails["refreshToken"] =  userSession.getRefreshToken().getToken();

            resolve(userDetails);
          });
        });
      }); 
    }

      

    async verifyUser({username, verificationCode}){
      return new Promise((resolve, reject) => {
        const cognitoUser = new CognitoUser({
          Username: username,
          Pool: this.userPool
        });
        cognitoUser.confirmRegistration(verificationCode, true, (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      });
    }

    async sendVerificationCodeAgain(username){
      return new Promise((resolve, reject) => {
        const cognitoUser = new CognitoUser({
          Username: username,
          Pool: this.userPool
        });
        cognitoUser.resendConfirmationCode((err, result) => {
          if (err) {
            reject(err);
          } else {
            console.log(result)
            resolve(result);
          }
        });
      });
    }

    async refreshAccessToken() {
      return new Promise((resolve, reject) => {
        const cognitoUser = this.userPool.getCurrentUser();

        if (!cognitoUser) {
          reject(new Error("No authenticated user found"));
        }
      
        cognitoUser.getSession((sessionError, session) => {
          if (sessionError) return reject(sessionError);
      
          cognitoUser.refreshSession(session.refreshToken, (err, newSession) => {
            if (err) {
              console.log(err);
            } else {
              resolve(session);
            }
          });

        });

      });
    }
}

const authService = new AuthService();
export default authService;