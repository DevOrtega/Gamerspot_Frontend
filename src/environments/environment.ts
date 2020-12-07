// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: "http://localhost:3000",
  corsProxy: "http://localhost:8080",
  trackerggApiUrl: "https://public-api.tracker.gg/v2",
  riotApiUrl: ".api.riotgames.com/",
  summonerUrl:"lol/summoner/v4/summoners/by-name/",
  lolStatsUrl:"lol/league/v4/entries/by-summoner/",
  tftUrl:"tft/summoner/v1/summoners/by-name/",
  tftStatsUrl:"tft/league/v1/entries/by-summoner/",
  restCountriesUrl: "https://restcountries.eu/rest/v2",
  riotAPIKey: "RGAPI-3d9d9818-5bc4-47cf-9b3c-c87373244dcd",
  trackerAPIKey: "cfe19ea4-d2a6-4667-b9bd-da5f473c6baf",
  firebaseConfig: {
    apiKey: "AIzaSyD3MSbJI8LsE8kQPfRN8QV8MMhE4KcUg9k",
    authDomain: "photos-gallery-a06e9.firebaseapp.com",
    projectId: "photos-gallery-a06e9",
    storageBucket: "photos-gallery-a06e9.appspot.com",
    messagingSenderId: "659362710075",
    appId: "1:659362710075:web:87f96984aed2e5b4f5921e"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
