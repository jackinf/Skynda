import React, {PropTypes} from "react";
import {Button, Row, Col} from "react-bootstrap";
import "./Locale.scss";

const languages = [
  {title: "EST", value: "et"},
  {title: "ENG", value: "en"}
];

class LocaleChanger extends React.Component {

  render() {
    console.log("LocaleChanger", this.props)
    return (
      <div id="localeChanger" >
          {languages.map((language, i) => {
            return (
              <Button key={i} className={this.props.activeLocale == language.value ? "active" : ""}
                onClick={ e => {
                  e.preventDefault();
                  this.props.onLocaleChange(language.value)
                }}
              >{language.title}
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
