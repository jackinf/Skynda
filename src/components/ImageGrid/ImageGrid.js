/**
 * Created by jevgenir on 17/09/2016.
 */

import React from 'react';
import InfoImage from './../InfoImage/InfoImage';

export default class ImageGrid extends React.Component {
  render() {
    const { rows } = this.props;

    return (<section>
      {rows.map((row, i) => (<div className="row" key={i}>
        {row.map((value, j) => {
          return (<div className="col-md-4" key={j}>
            <InfoImage key={j} src={value.src} href={value.href}>
              <h5>{value.title}</h5>
              <p>{value.description}</p>
            </InfoImage>
          </div>);
        })}

      </div>))}
    </section>);
  }
}
