import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from '../environments/environment';
import { CoreHttpInterceptor } from './core/interceptors/interceptor.service';

import { HTTP_INTERCEPTORS, provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { BrowserCacheLocation, IPublicClientApplication, InteractionType, LogLevel, PublicClientApplication } from '@azure/msal-browser';
import {
  MSAL_GUARD_CONFIG, MSAL_INSTANCE, MSAL_INTERCEPTOR_CONFIG, MsalBroadcastService, MsalGuard, MsalGuardConfiguration,
  MsalInterceptor, MsalInterceptorConfiguration, MsalService,
  ProtectedResourceScopes
} from '@azure/msal-angular';

// const isIE = window.navigator.userAgent.indexOf("MSIE ") > -1 || window.navigator.userAgent.indexOf("Trident/") > -1;

export function loggerCallback(logLevel: LogLevel, message: string) {
  //aquí por si necesita implementar logs
}

//#region MSAL pre-configuration
export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication({
    auth: {
      clientId: environment.msalConfig.auth.clientId,
      authority: environment.b2cPolicies.authorities.signUpSignIn.authority,
      knownAuthorities: [environment.b2cPolicies.authorityDomain],
      redirectUri: '/auth',
      postLogoutRedirectUri: '/',
      skipAuthorityMetadataCache: false,
      navigateToLoginRequestUrl: true
    },
    cache: {
      cacheLocation: BrowserCacheLocation.SessionStorage, // Mantenga SessionStorage
      //storeAuthStateInCookie: isIE, // Mantenga la configuración para IE
    },
    system: {
      allowNativeBroker: false, // Especifica si se permite el uso del agente nativo de autenticación (WAM Broker) en dispositivos Windows
      loggerOptions: {
        loggerCallback,
        logLevel: LogLevel.Info,
        piiLoggingEnabled: false
      }
    }
  });
}
export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
  const protectedResourceMap = new Map<string, Array<string | ProtectedResourceScopes> | null>();
  protectedResourceMap.set(environment.apiConfig.uri, [...environment.apiConfig.scopes.read, ...environment.apiConfig.scopes.write]);
  return {
    interactionType: InteractionType.Redirect,
    protectedResourceMap
  };
}
export function MSALGuardConfigFactory(): MsalGuardConfiguration {
  return {
    interactionType: InteractionType.Redirect,
    authRequest: loginRequest
  };
}
export const loginRequest = {
  scopes: []
};
//#endregion MSAL

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(BrowserModule),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptorsFromDi(), withFetch()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CoreHttpInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
    },
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory
    },
    {
      provide: MSAL_GUARD_CONFIG,
      useFactory: MSALGuardConfigFactory
    },
    {
      provide: MSAL_INTERCEPTOR_CONFIG,
      useFactory: MSALInterceptorConfigFactory
    },
    MsalService,
    MsalGuard,
    MsalBroadcastService
  ]
};
