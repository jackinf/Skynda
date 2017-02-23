const getDefaultHeaders = () => {
  return {
    "Accept": "application/json",
    "Content-Type": "application/json"
  }
};

const handle = (promise) => {
  return promise.then(response => response.json())
    .then(response => {
      return response;
    })
    .catch(error => {
      throw error
    });
};

export {
  handle,
  getDefaultHeaders
}
