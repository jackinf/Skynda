/**
 * Created by jevgenir on 10/29/2016.
 */
import remoteConfig from "store/remoteConfig";

export function submitFormTest1(data, files) {
  console.log("Submitted values: ", data);
  console.log("File: ", files);

  let formData = new FormData();

  // for (let i in files) {
  //   let file = files[i];
  //   formData.append(file.name, file);
  // }
  formData.append("file", files[0]);
  // formData.append('properties', new Blob([JSON.stringify(data)], {type: "application/json"}));
  // formData.append('properties', new Blob([JSON.stringify({
  //   "name": "root",
  //   "password": "root"
  // })], {
  //   type: "application/json"
  // }));
  console.log(formData);

  return fetch(`${remoteConfig.remote}/api/blob/test-upload-1-single`, {
    method: "POST",
    mode: 'no-cors',
    headers: {"Content-Type": undefined},
    body: formData
  })
    .then(resp => resp.json())
    .then(resp => {
      console.log(resp);
    })
}

export function submitFormTest2(data, files) {
  console.log("Submitted values: ", data);
  console.log("File: ", files);

  let formData = new FormData();
  for (let x = 0; x < files.length; x++) {
    formData.append("files", files[x]);
  }
  formData.append("name", data.name || "john");

  return fetch(`${remoteConfig.remote}/api/blob/test-upload-2-multiple`, {
    method: "POST",
    mode: 'no-cors',
    headers: {"Content-Type": undefined},
    body: formData
  })
    .then(resp => resp.json())
    .then(resp => {
      console.log(resp);
    })
}

export function submitFormTest3(data, files) {
  console.log("Submitted values: ", data);
  console.log("File: ", files);

  let formData = new FormData();
  for (let x = 0; x < files.length; x++) {
    formData.append("files", files[x]);
  }
  formData.append("info", new Blob([JSON.stringify({
    "name": "john",
    "features": [{"id": "1", "text": "text123"}]
  })], {
    type: "application/json"
  }));

  return fetch(`${remoteConfig.remote}/api/blob/test-upload-3-complex`, {
    method: "POST",
    mode: 'no-cors',
    headers: {"Content-Type": undefined},
    body: formData
  })
    .then(resp => resp.json())
    .then(resp => {
      console.log(resp);
    })
}

/**
 * NB! THIS SHOULD FAIL! YOU CANNOT SEND FILES USING SOMETHING OTHER THAN POST.
 * @param data
 * @param files
 * @returns {Promise.<TResult>|*|Thenable<U>|Promise<U>}
 */
export function submitFormTest4(data, files) {
  console.log("Submitted values: ", data);
  console.log("File: ", files);

  let formData = new FormData();
  for (let x = 0; x < files.length; x++) {
    formData.append("files", files[x]);
  }
  formData.append("info", new Blob([JSON.stringify({
    "name": "john",
    "features": [{"id": "1", "text": "text123"}]
  })], {
    type: "application/json"
  }));

  return fetch(`${remoteConfig.remote}/api/blob/test-upload-4-complex`, {
    method: "PUT",
    mode: 'no-cors',
    headers: {"Content-Type": undefined},
    body: formData
  })
    .then(resp => resp.json())
    .then(resp => {
      console.log(resp);
    })
}
