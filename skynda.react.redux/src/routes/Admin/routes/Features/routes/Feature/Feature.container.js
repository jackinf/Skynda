import {connect} from "react-redux";
import {reduxForm} from 'redux-form';
import {FORMS, REDUCER_KEYS} from "./Feature.constant";
import {
  clear,
  load,
  formSubmit,
  onFormSubmitSuccess,
  setFormMode
} from "./actions";
import ViewComponent from "./components/Feature.component";

const mapDispatchToProps = {
  load,
  clear,
  formSubmit,
  onFormSubmitSuccess,
  setFormMode
};

const mapStateToProps = (state) => {
  return {
    isFetching: state[REDUCER_KEYS.FEATURE_DATA].isFetching,
    initialValues: state[REDUCER_KEYS.FEATURE_DATA].data,
    formModeFeature: state[REDUCER_KEYS.FEATURE_FORM_MODE]
  };
};

const DecoratedViewComponent = reduxForm({
  form: FORMS.FEATURE_FORM
})(ViewComponent);

export default connect(mapStateToProps, mapDispatchToProps)(DecoratedViewComponent);
