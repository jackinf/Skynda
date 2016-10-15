import React, { PropTypes } from 'react'

class Button extends React.Component {
  render() {
    console.log("Button props mother fucker", this.props);

    return (
      <button className={this.props.classes}
              onSubmit={e => {
                e.preventDefault();
                this.props.onSubmit()
              }}
              onClick={e => {
                e.preventDefault();
                this.props.onClick()
              }}
      >
        {this.props.isSearching ? "true" : "false"}
        {this.props.children}
      </button>
    );
  }
}

Button.propTypes = {
  classes: PropTypes.string,
  children: PropTypes.node,
  onClick: PropTypes.func,
  onSubmit: PropTypes.func,
};

export default Button
