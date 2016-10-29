/**
 * Created by jevgenir on 10/29/2016.
 */
import setTestFile from "./FileUpload.setTestFile.action";

export default function onChangeFiles(files) {
  return (dispatch, getState) => {
    console.log(files);
    dispatch(setTestFile(files));
  };
}
