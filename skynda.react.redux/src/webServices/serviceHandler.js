const getDefaultHeaders = () => {
  return {
    "Accept": "application/json",
    "Content-Type": "application/json"
  }
};

const handle = (promise) => {
  return promise.then(response => response.json())
    .then(response => {
      if (response.isSuccessful === false) {
        throw response;
      }
      return response.payload;
    })
    .catch(error => {
      throw error
    });
};

export {
  handle,
  getDefaultHeaders
}
