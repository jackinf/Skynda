import clear from "../actions/Report.clear";
import load from "../actions/Report.load";
import {formSubmit, onFormSubmitSuccess, onFormSubmitError} from "../actions/Report.submitForm";
import getList from "../actions/Reports.getList";
import deleteItem from "../actions/Reports.deleteItem";
import {onFaultFileUpload, onFaultRemove} from "../actions/Report.image";
import {setFormMode, setVehicleReportData,setVehicleReports} from "./Report.reducer";

export {
  clear,
  load,
  formSubmit,
  onFormSubmitSuccess,
  onFormSubmitError,
  getList,
  deleteItem,
  onFaultFileUpload,
  onFaultRemove,

  //reducers
  setVehicleReportData,
  setVehicleReports,
  setFormMode
}
