import React from "react";
import classnames from 'classnames';
import PropTypes from 'prop-types';

import State from '../states/traffic-light';

export default function Component({ light }) {
  return (
    <div className="trafficlight">
      <div className="protector" />
      <div className="protector" />
      <div className="protector" />
      <div className={classnames('red', {
        'is-active': light.color.isRed
      })} />
      <div className={classnames('yellow', {
        'is-active': light.color.isYellow
      })} />
      <div className={classnames('green', {
        'is-active': light.color.isGreen,
        'is-blinking': light.isBlinking
      })} />
    </div>
  );
}

TrafficLight.propTypes = {
  light: PropTypes.instanceOf(State)
}
