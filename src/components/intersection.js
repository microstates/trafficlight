import React from "react";
import Interval from "react-interval";
import { valueOf } from "microstates";

import TrafficLight from "./traffic-light";
import Pedestrian from "./pedestrian";

export default function Intersection({ intersection }) {
  return (
    <>
      <Interval enabled timeout={1000} callback={intersection.tick} />
      <main>
        <TrafficLight light={intersection.light} />
        <Pedestrian pedestrian={intersection.pedestrian} />
      </main>
      <footer>{JSON.stringify(valueOf(intersection), undefined, 2)}</footer>
    </>
  )
}