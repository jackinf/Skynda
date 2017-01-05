import React, {PropTypes} from "react";
import {Button} from "react-bootstrap";
import "./Locale.scss";
import est from "../../static/images/flags/flags-iso/shiny/24/EE.png";
import eng from "../../static/images/flags/flags-iso/shiny/24/GB.png";

const languages = [
  {title: "EST", value: "et"},
  {title: "ENG", value: "en"}
];

class LocaleChanger extends React.Component {

  onLocaleChange = (e, language) => {
    e.preventDefault();
    this.props.onLocaleChange(language.value)
  };

  render() {
    return (
      <div id="localeChanger">
        {languages.map((language, i) => {
          return (
            <Button key={i} onClick={e => this.onLocaleChange(e, language)}>
              {language.value === "et" ? <img src={est}/> : <img src={eng}/>}
            </Button>
          );
        })}
      </div>
    );
  }
}

LocaleChanger.propTypes = {
  classes: PropTypes.string,
  onLocaleChange: PropTypes.func.isRequired,
  activeLocale: PropTypes.string
};

export default LocaleChanger;
