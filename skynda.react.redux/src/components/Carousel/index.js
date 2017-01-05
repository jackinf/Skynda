import React, {PropTypes} from 'react'

class Carousel extends React.Component {
  render() {
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
        {this.props.children}
      </button>
    );
  }
}

Carousel.propTypes = {
  classes: PropTypes.string,
  children: PropTypes.node,
  onClick: PropTypes.func,
  onSubmit: PropTypes.func,
};

export default Carousel
