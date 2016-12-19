/**
 * Created by jevgenir on 10/2/2016.
 */
// const globalConfig = require("../../config");
// const __PROD__ = globalConfig.globals.__PROD__;
const __PROD__ = false;

// TODO: use global config
const config = {
  pipeDrive: {
    api_token_key_value: "api_token=a8f71712cc3853b6bbe9d496a2025af2083d468b",
    api_token_value: "a8f71712cc3853b6bbe9d496a2025af2083d468b", // Jevgeni R. token

    deals_api: "https://api.pipedrive.com/v1/deals",
    stages_api: "https://api.pipedrive.com/v1/stages",
  }
};

if (__PROD__) {
  config.remote = "http://207.154.192.200:8888";
} else {
  config.remote = "localhost:8888";
}

export default config;
