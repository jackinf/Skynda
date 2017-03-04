/**
 * Created by jevgenir on 10/2/2016.
 */

const env = process.env.NODE_ENV || "development";
const config = {
  remote: "http://localhost:44444",

  pipeDrive: {
    api_token_key_value: "api_token=a8f71712cc3853b6bbe9d496a2025af2083d468b",
    api_token_value: "a8f71712cc3853b6bbe9d496a2025af2083d468b", // Jevgeni R. token

    deals_api: "https://api.pipedrive.com/v1/deals",
    stages_api: "https://api.pipedrive.com/v1/stages",
  }
};

if (env === "production") {
  config.remote = "https://skyndabackend.azurewebsites.net";
}

export default config;
