const conf = {
    clientId: String(import.meta.env.VITE_CLIENT_ID),
    cognitoUserPoolId: String(import.meta.env.VITE_COGNITO_USER_POOL),
    providerApiURL: String(import.meta.env.VITE_PROVIDER_API_ENDPOINT),
    patientApiURL: String(import.meta.env.VITE_PATIENT_API_ENDPOINT),
    predictionApiURL: String(import.meta.env.VITE_PREDICTION_API_ENDPOINT),
}

export default conf;