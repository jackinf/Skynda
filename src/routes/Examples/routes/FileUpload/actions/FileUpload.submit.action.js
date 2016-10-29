/**
 * Created by jevgenir on 10/29/2016.
 */
import remoteConfig from "store/remoteConfig";

export default function submitMyForm(data, files) {
  console.log("Submitted values: ", data);
  console.log("File: ", files);

  let formData = new FormData();

  // for (let i in files) {
  //   let file = files[i];
  //   formData.append(file.name, file);
  // }
  formData.append("file", files[0]);
  // formData.append('properties', new Blob([JSON.stringify(data)], {type: "application/json"}));
  formData.append('properties', new Blob([JSON.stringify({
    "name": "root",
    "password": "root"
  })], {
    type: "application/json"
  }));
  console.log(formData);

  return fetch(`${remoteConfig.remote}/api/blob/test-upload`, {
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
