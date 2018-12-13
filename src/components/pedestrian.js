import React from "react";
import PropTypes from "prop-types";

import Person from "../states/person";

export default function Pedestrian({ pedestrian }) {
  
  let activity = pedestrian.activity.isWalking
    ? "walking"
    : pedestrian.activity.isRunning
    ? "running"
    : pedestrian.activity.isStanding
    ? "standing"
    : null;

  return (
    <div className={`pedestrian is-${activity}`}>
      <img alt={`Pedestrian is ${activity}`} />
    </div>
  );
}

Pedestrian.propTypes = {
  pedestrian: PropTypes.instanceOf(Person)
};
