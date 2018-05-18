// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyAYwhC7v86pl92UtPXm68eMs9a6NI2DZ0Q",
    authDomain: "people-making-a-difference.firebaseapp.com",
    databaseURL: "https://people-making-a-difference.firebaseio.com",
    projectId: "people-making-a-difference",
    storageBucket: "people-making-a-difference.appspot.com",
    messagingSenderId: "70853020347"
  }
};
