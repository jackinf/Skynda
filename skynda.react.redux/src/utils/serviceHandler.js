export const LOCAL_STORAGE_TOKEN_KEY = "triven_id_token";
export const LOCAL_STORAGE_PROFILE_KEY = "triven_profile";

const getDefaultHeaders = () => {
  const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY) || null;
  return {
    "Accept": "application/json",
    "Content-Type": "application/json",
    'Authorization': `Bearer ${token}`
  }
};

const handle = (promise) => {
  return promise
    .then(response => response.json().then(data => ({data, httpResponse: response})))
    .then(({data, httpResponse}) => {

      if (httpResponse.ok === false) {
        console.info("Web Service handle. FAILURE.", data);
        throw data;
      } else {
        console.info("Web Service handle. SUCCESS.", data);
        return data.payload ? data.payload : data;
      }

  });
};

export {
  handle,
  getDefaultHeaders
}
