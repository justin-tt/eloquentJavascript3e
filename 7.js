const roads = require('./7-roads')

const buildGraph = function buildGraph(edges) {
  let graph = Object.create(null);
  function addEdge(from, to) {
    if (graph[from] == null) {
      graph[from] = [to];
    } else {
      graph[from].push(to);
    }
  }
  for (let [from, to] of edges.map(r => r.split("-"))) {
    addEdge(from, to);
    addEdge(to, from);
  }
  return graph;
}

const roadGraph = buildGraph(roads.roads);
// console.log(roadGraph);

class VillageState {
  constructor(place, parcels) {
    this.place = place;
    this.parcels = parcels;
  }

  move(destination) {
    if (!roadGraph[this.place].includes(destination)) {
      // there's no route to the destination, don't move (no new state)
      return this;
    } else {
      let parcels = this.parcels.map(p => {
        if (p.place != this.place) return p;
        // parcels "move" along with robot by having a "place" state
        return {place: destination, address: p.address};
      }).filter(p => p.place != p.address); // if the parcel has "arrived" at destination, filter it out
      return new VillageState(destination, parcels);
    }
  }
}

// there's a design pattern here, strategy? the type of robot isn't specified
const runRobot = function runRobot(state, robot, memory) {
  for (let turn = 0; ; turn++) {
    if (state.parcels.length == 0) {
      console.log(`Done in ${turn} turns.`);
      break; // breaks out the infinite for loop
    }
    let action = robot(state, memory); // robot's api is to return an action object with direction/memory properties
    state = state.move(action.direction);
    memory = action.memory;
    console.log(`Moved to ${action.direction}`);
  }
}

// programming a robot that picks randomly as its strategy
function randomPick(array) {
  let choice = Math.floor(Math.random() * array.length);
  return array[choice];
}

function randomRobot(state) {
  return {direction: randomPick(roadGraph[state.place])};
}

VillageState.random = function(parcelCount = 5) {
  let parcels = [];
  for (let i = 0; i < parcelCount; i++) {
    let address = randomPick(Object.keys(roadGraph));
    let place;
    do {
      place = randomPick(Object.keys(roadGraph));
    } while (place == address);
    parcels.push({place, address});
  }
  return new VillageState("Post Office", parcels);
}

// Starting a virtual world (like main())
runRobot(VillageState.random(), randomRobot);

// improving the robot that keeps going around the entire village in fixed route
const mailRoute = [
  "Alice's House", "Cabin", "Alice's House", "Bob's House",
  "Town Hall", "Daria's House", "Ernie's House",
  "Grete's House", "Shop", "Grete's House", "Farm",
  "Marketplace", "Post Office"
]

function routeRobot(state, memory) {
  if (memory.length == 0) {
    memory = mailRoute;
  }
  return {direction: memory[0], memory: memory.slice(1)};
}

runRobot(VillageState.random(), routeRobot, []);

// improving the robot to do breadth first search to find the shortest path to a destination
function findRoute(graph, from, to) {
  let work = [{at: from, route: []}];
  for (let i = 0; i < work.length; i++) { // i guess work.length is recalculated every new iteration
    let {at, route} = work[i];
    for (let place of graph[at]) {
      if (place == to) return route.concat(place);

      // a new state is created for all of the child nodes in the bfs graph, but 
      // a new route is also created to capture that we got to this child
      // from the starting position
      if (!work.some(w => w.at == place)) {
        work.push({at: place, route: route.concat(place)});
      }
    }
  }
  // the for loop exits if we couldn't get to location. but
  // our graph is "connected", so this shouldn't happen
}
console.log(findRoute(roadGraph, "Alice's House", "Grete's House"));

function goalOrientedRobot({place, parcels}, route) {
  if (route.length == 0) {
    let parcel = parcels[0];
    if (parcel.place != place) { // we need to pick up the parcel if we aren't there
      route = findRoute(roadGraph, place, parcel.place);
    } else { // we're there, but need to deliver the parcel
      route = findRoute(roadGraph, place, parcel.address);
    }
  }
  return {direction: route[0], memory: route.slice(1)} // robot only needs to keep track of route to parcel at the top of the list
}
runRobot(VillageState.random(), goalOrientedRobot, []);


let first = new VillageState(
  "Post Office",
  [{place: "Post Office", address: "Alice's House"}]
);
let next = first.move("Alice's House");

// console.log(next.place);
// console.log(next.parcels);
// console.log(first.place);
