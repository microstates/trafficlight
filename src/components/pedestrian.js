import React from "react";
import PropTypes from "prop-types";

import Person from "../states/person";

export default function Pedestrian({ pedestrian: { activity } }) {

  let id = activity.isWalking
    ? "QpWDP1YMziaQw"
    : activity.isStanding
    ? "ghhynvHS4NbDG"
    : activity.isRunning
    ? "3D0tSwNjVK56z6okJp"
    : null;

  return (
    <div
      className="pedestrian"
      style={{
        margin: "40px",
        backgroundPosition: "0 0",
        backgroundSize: "contain",
        backgroundImage: `url(https://media.giphy.com/media/${id}/giphy.gif)`,
        backgroundRepeat: "no-repeat"
      }}
    />
  );
}

Pedestrian.propTypes = {
  pedestrian: PropTypes.instanceOf(Person)
};
