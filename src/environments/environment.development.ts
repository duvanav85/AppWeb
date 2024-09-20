export const environment = {
    domain : "localhost",
    commercialSupportEmail: "",
    production: false,
    apiBaseUrl: "https://localhost:5216/api",
    msalConfig: {
      auth: {
        clientId: "6af0696e-30d6-43e0-8313-a6057e7ce964"
      },
    },
    apiConfig: {
      scopes: {
        read: ["https://annonimus.onmicrosoft.com/d0e2d22a-59dc-45cc-a4d6-53364184844e/Read"],
        write: ["https://annonimus.onmicrosoft.com/d0e2d22a-59dc-45cc-a4d6-53364184844e/Write"]
      },
      uri: "https://localhost:5216/api",
    },
    b2cPolicies: {
      names: {
        signUpSignIn: "B2C_1_Waivers_devqa",
        resetPassword: "",
        editProfile: ""
      },
      authorities: {
        signUpSignIn: {
          authority: 'https://avtestonlineb2c.b2clogin.com/avtestonlineb2c.onmicrosoft.com/B2C_1_Waivers_devqa',
        }
      },
      authorityDomain: 'avtestonlineb2c.b2clogin.com',
    },
  };
  