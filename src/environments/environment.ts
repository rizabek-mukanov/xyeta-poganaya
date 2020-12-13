/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  // apiUrl: 'http://10.111.2.141:8080',
  apiUrl: 'http://localhost:9090',
  // apiUrl: 'http://172.20.20.23:8080',
  imageUrl: 'https://api.smartplaza.kz/partners/api/file/logo',
  tokenPrefix: 'Bearer ',
  apiToken: 'apiToken',
  userName: 'userName',
};
