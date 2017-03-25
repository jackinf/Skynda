import _ from "underscore";

const maxFileSizeInMb = 1.5;
const fileMaxSize = maxFileSizeInMb * 1000 * 1000;

export const validate = (file, errors) => {
  if (!file) {
    errors.file = 'Required';
  } else {
    if (!/\.(jpe?g|png|gif|tiff|bmp)$/i.test(file.name)) {
      errors.file = 'File must be an .png, .jpg, .jpeg, .tiff, .gif, .bmp type';
    }
    else if (file.size > fileMaxSize) {
      errors.file = `Upload file cannot exceed ${maxFileSizeInMb}MB size`;
    }
  }

  return _.isEmpty(errors);
};

export function imageFileToBase64(file, onSuccess) {
  // Make sure `file.name` matches our extensions criteria
  let errors = {};
  if (validate(file, errors)) {
    const reader = new FileReader();
    reader.addEventListener("load", function () {
      onSuccess(this.result); // returns base64File
    }, false);
    reader.readAsDataURL(file);
  }

  return errors;
}

export default {
  imageFileToBase64
}
