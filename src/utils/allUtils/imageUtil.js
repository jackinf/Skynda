/**
 * Created by jevgenir on 11/2/2016.
 */

export function imageFileToBase64(file, onSuccess) {
  // Make sure `file.name` matches our extensions criteria
  if (/\.(jpe?g|png|gif)$/i.test(file.name)) {
    var reader = new FileReader();
    reader.addEventListener("load", function () {
      onSuccess(this.result);
    }, false);
    reader.readAsDataURL(file);
  }
}

export default {
  imageFileToBase64
}
