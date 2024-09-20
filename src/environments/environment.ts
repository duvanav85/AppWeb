export const environment = {
  production: true,
  commercialSupportEmail: `#{env.commercialSupportEmail}#`,
  identityMaster: '#{env.identityMaster}#',
  domain : '#{env.domain}#',
  apiBaseUrl: '#{env.apibaseurl}#' + "/v" + '#{env.versionapi}#',
  msalConfig: {
    auth: {
      clientId: '#{env.clientid}#',
    },
  },
  apiConfig: {
    scopes: {
      read: ['#{env.scopes.read}#'],
      write: ['#{env.scopes.write}#']
    },
    uri: '#{env.apibaseurl}#' + "/v" + '#{env.versionapi}#',
  },
  b2cPolicies: {
    names: {
      signUpSignIn: '#{env.singupsingin}#',
      resetPassword: '',
      editProfile: ''
    },
    authorities: {
      signUpSignIn: {
        authority: '#{env.authority}#'
      },
    },
    authorityDomain: '#{env.authoritydomain}#'
  }
}
