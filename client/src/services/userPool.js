import {
	CognitoUserPool
} from 'amazon-cognito-identity-js'

const poolData = {
	UserPoolId: import.meta.env.VITE_COGNITO_USER_POOL,
	ClientId: import.meta.env.VITE_CLIENT_ID,
}

const userPool = new CognitoUserPool(poolData)

export default userPool;