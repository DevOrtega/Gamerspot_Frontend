// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: "http://localhost:3000",
  //apiUrl: "http://ec2-15-237-13-78.eu-west-3.compute.amazonaws.com:3000",
  corsProxy: "https://cors-anywhere.herokuapp.com",
  trackerggApiUrl: "https://public-api.tracker.gg/v2",
  lolApiUrl: ".api.riotgames.com/",
  summonerUrl:"lol/summoner/v4/summoners/by-name/",
  lolStatsUrl:"lol/league/v4/entries/by-summoner/",
  tftUrl:"tft/summoner/v1/summoners/by-name/",
  tftStatsUrl:"tft/league/v1/entries/by-summoner/",
  restCountriesUrl: "https://restcountries.eu/rest/v2",
  lolAPIKey: "RGAPI-9bbbafef-2d2d-4cc2-b51c-feaddabbc621",
  trackerAPIKey: "cfe19ea4-d2a6-4667-b9bd-da5f473c6baf"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
