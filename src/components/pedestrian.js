import React from "react";
import PropTypes from "prop-types";
import { valueOf } from "microstates";

import Person from "../states/person";

export default function Pedestrian({ pedestrian }) {
  let activity = valueOf(pedestrian.activity);

  return (
    <div className={`pedestrian is-${activity}`}>
      <img alt={`Pedestrian is ${activity}`} />
    </div>
  );
}

Pedestrian.propTypes = {
  pedestrian: PropTypes.instanceOf(Person)
};
