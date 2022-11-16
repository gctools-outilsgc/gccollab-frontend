import { NgModule } from '@angular/core';
import { AuthModule } from 'angular-auth-oidc-client';

@NgModule({
    imports: [AuthModule.forRoot({
        config: {
            authority: 'https://dev.account.gccollab.ca/openid',
            redirectUrl: window.location.origin,
            postLogoutRedirectUri: window.location.origin,
            clientId: '429862',
            scope: 'openid profile token_introspection',
            responseType: 'id_token token',
            silentRenew: true,
            useRefreshToken: true,
            silentRenewUrl: window.location.origin + '/silent-renew.html',
            renewTimeBeforeTokenExpiresInSeconds: 10,
            postLoginRoute: '/home',
            unauthorizedRoute: '/unauthorized',
            forbiddenRoute: '/forbidden',
            secureRoutes: [
                'https://dev.account.gccollab.ca/api',
            ]
        }
      })],
    exports: [AuthModule],
})
export class AuthConfigModule {}
