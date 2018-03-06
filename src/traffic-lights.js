import React from "react";
import classnames from 'classnames';
import PropTypes from 'prop-types';

import * as models from './models';

export default function TrafficLight({ light }) {
  return (
    <div className="trafficlight">
      <div className="protector" />
      <div className="protector" />
      <div className="protector" />
      <div className={classnames('red', {
        'is-active': light.isRed
      })} />
      <div className={classnames('yellow', {
        'is-active': light.isYellow
      })} />
      <div className={classnames('green', {
        'is-active': light.isGreen,
        'is-blinking': light.isBlinking
      })} />
    </div>
  );
}

TrafficLight.propTypes = {
  light: PropTypes.instanceOf(models.TrafficLight)
}
