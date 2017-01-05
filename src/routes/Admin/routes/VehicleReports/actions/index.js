/**
 * Created by zekar on 10/23/2016.
 */

import clear from "./VehicleReport.clear.action";
import load from "./VehicleReport.load.action";
import {formSubmit, onFormSubmitSuccess, onFormSubmitError} from "./VehicleReport.submitForm.action";
import fillWithFakeData from "./VehicleReport.fillWithFakeData.action";
import getList from "./VehicleReports.getList.action";
import deleteItem from "./VehicleReports.deleteItem.action";

export {
  clear,
  load,
  formSubmit,
  onFormSubmitSuccess,
  onFormSubmitError,
  fillWithFakeData,
  getList,
  deleteItem
}
