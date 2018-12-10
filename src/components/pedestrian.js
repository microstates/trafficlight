import React from "react";
import PropTypes from 'prop-types';

import Person from '../states/person'

export default function Pedestrian ({ pedestrian }) {
  if (pedestrian.activity.isWalking) {
    return <img className="pedestrian" src="https://media.giphy.com/media/QpWDP1YMziaQw/giphy.gif" alt="walking" />;
  }
  if (pedestrian.activity.isStanding) {
    return <img className="pedestrian" src="https://media.giphy.com/media/ghhynvHS4NbDG/giphy.gif" alt="standing"  />;
  }
  if (pedestrian.activity.isRunning) {
    return <img className="pedestrian" src="https://media.giphy.com/media/7kn27lnYSAE9O/giphy.gif" alt="running" />;
  }
  return null;
}

Pedestrian.propTypes = {
  pedestrian: PropTypes.instanceOf(Person)
}