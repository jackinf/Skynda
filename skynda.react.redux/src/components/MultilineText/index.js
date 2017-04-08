import React, {PropTypes} from 'react'

class MultilineText extends React.Component {
  render() {
    return (
      <div>
        {this.props.value.split("\n").map((object, i) => {
          return <div key={i}>{object}</div>;
        })}
      </div>
    );
  }
}

MultilineText.propTypes = {
  value: PropTypes.string.isRequired
};

export default MultilineText
