import React, {PropTypes} from "react";
import {Button, Row, Col} from "react-bootstrap";
import "./Locale.scss";
import est from "../../static/images/flags/flags-iso/shiny/24/ee.png"
import eng from "../../static/images/flags/flags-iso/shiny/24/gb.png"

const languages = [
  {title: "EST", value: "et"},
  {title: "ENG", value: "en"}
];

class LocaleChanger extends React.Component {

  render() {
    return (
      <div id="localeChanger" >
          {languages.map((language, i) => {
            return (
              <Button key={i} className={this.props.activeLocale == language.value ? "active" : ""}
                onClick={ e => {
                  e.preventDefault();
                  this.props.onLocaleChange(language.value)
                }}
              >
                {language.value === "et"
                ? <img
                    src={est}
                  />
                : <img
                    src={eng}
                  />
                }
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
