# Traffic Light State Machin with Microstates

Checkout [Microstates.js Project](https://github.com/microstates/microstates.js) if you haven't already.

This application is an example of using Microstates to build State Machines. This is one of the popular examples of state machines but it adds a small Microstaty twist. It shows how you an compose state machines and transition state one state machine based on another. 

In this example, has [TrafficLight state machine](https://github.com/microstates/trafficlight/blob/master/src/states/traffic-light.js) and a [Person state machine](https://github.com/microstates/trafficlight/blob/master/src/states/person.js). When the traffic light is red, the pedastrian stands and waits, runs when it's yellow and walks when it's green. Both state machines are composed into an [Intersection state machine](https://github.com/microstates/trafficlight/blob/master/src/states/intersection.js).

The file structure has `/src/states` directory where all of the state machines and their tests are. `/src/components` directory has components for rendering the state machines. The state machines are brought to live by an [Interval component](/src/index.js#L28) which calls Intersection's tick transition every minute.

## Intallation

1. Clone this repo `git clone git@github.com:microstates/trafficlight.git`
2. Install npm dependencies with `yarn` or `npm install`
3. `yarn start` or `npm start` to start the server

## Testing

You can run tests with `yarn test` or `npm test`.

## Contributing

PRs and Questions are welcome.
