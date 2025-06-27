import { PublicClientApplication } from "@azure/msal-browser";

export const msalConfig = {
  auth: {
    clientId: "51649e05-23c7-461e-b352-9d5a99baaf2e", // Your Azure AD app clientId
    authority: "https://login.microsoftonline.com/db1da972-c0bf-49a1-84f5-61ff2fb4b00b", // Your tenant ID
    redirectUri: "http://localhost:5173/", // Your frontend URL
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: false,
  },
};

export const msalInstance = new PublicClientApplication(msalConfig);
