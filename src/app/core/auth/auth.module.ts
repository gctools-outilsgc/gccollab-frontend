import { NgModule } from '@angular/core';
import { AbstractSecurityStorage, AuthModule } from 'angular-auth-oidc-client';
import { environment } from 'src/environments/environment';
import { SessionStorageService } from '../services/session-storage.service';

@NgModule({
  imports: [
    AuthModule.forRoot({
      config: {
        authority: environment.authUrl,
        redirectUrl: window.location.origin,
        postLogoutRedirectUri: window.location.origin,
        clientId: environment.clientId,
        scope: 'openid profile token_introspection',
        responseType: 'id_token token',
        //silentRenew: true,
        useRefreshToken: true,
        //silentRenewUrl: window.location.origin + '/silent-renew.html',
        //renewTimeBeforeTokenExpiresInSeconds: 10,
        triggerAuthorizationResultEvent: true,
        //postLoginRoute: '/home',
        unauthorizedRoute: '/unauthorized',
        forbiddenRoute: '/forbidden',
        secureRoutes: [environment.baseUrl],
        logLevel: environment.authLogLevel,
      },
    }),
  ],
  providers: [
    {
      provide: AbstractSecurityStorage,
      useClass: SessionStorageService,
    },
  ],
  exports: [AuthModule],
})
export class AuthConfigModule {}
