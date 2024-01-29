export const environment = {
  production: false,
  authGuard: false, // TODO: Switch this to true once we have OAuth working for PR
  clientId: '429862', // TODO: Create client during workflow and insert here
  baseUrl: 'https://dev.account.gccollab.ca/api',
  authUrl: 'https://dev.account.gccollab.ca/openid',
  authLogLevel: 0,
  i18nFolder: './assets/i18n/',
};
