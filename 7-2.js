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
// like main()
const runRobot = function runRobot(state, robot, memory) {
  for (let turn = 0; ; turn++) {
    if (state.parcels.length == 0) {
      console.log(`Done in ${turn} turns.`);
      return turn;
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
// runRobot(VillageState.random(), goalOrientedRobot, []);
// runRobot(VillageState.random(), routeRobot, []);
// runRobot(VillageState.random(), randomRobot);

// robot(state, memory)
function betterRobot({place, parcels}, route) {
  // parcel: {place, address}
  // greedy pickup: pick up the nearest parcel first, then the next nearest parcel to that parcel, etc
  // greedy delivery: deliver to the nearest place, then the next nearest place
  // it's different from the goalOrientedRobot because that robot finds and delivers one parcel at a time.
  
  // console.log(parcels, route);
  if (route.length == 0) { // need to say && parcels all collected
    // console.log(roadGraph, place); 
    
    // got stuck in an infinite loop because 
    // parcelLocations ARE where we are now...
    // and the state of the world updates them to 
    let bfsChildren = roadGraph[place];
    let parcelLocations = parcels.filter(p => p.place != place).map(p => p.place);
    // console.log("place bfsChildren, parcelLocations", place, bfsChildren, parcelLocations);
    // console.log("place parcels route", place, parcels, route);
    if (parcelLocations.length != 0) {
      while (bfsChildren.length > 0) {
        if (parcelLocations.indexOf(bfsChildren[0]) != -1) {
          /*
          if (place == bfsChildren[0]) {
            bfsChildren.shift();
          }
          if (parcelLocations.every(n => n == place)) {
            // collected all parcels, break while loop
            break;
          }
          */
          // console.log(bfsChildren);
          // console.log(findRoute(roadGraph, place, bfsChildren[0]));
          return {direction: bfsChildren[0], memory: findRoute(roadGraph, place, bfsChildren[0])};
        } else {
          bfsChildren = bfsChildren.concat(roadGraph[bfsChildren[0]]);
          bfsChildren.shift();
        }
      }
    } else {
      let parcelAddresses = parcels.map(p => p.address);
      while (bfsChildren.length > 0) {
        if (parcelAddresses.indexOf(bfsChildren[0]) != -1) {
          return {direction: bfsChildren[0], memory: findRoute(roadGraph, place, bfsChildren[0])};
        } else {
          bfsChildren = bfsChildren.concat(roadGraph[bfsChildren[0]]);
          bfsChildren.shift();
        }
      }
    }
    // deliver all parcels

  }
  return {direction: route[0], memory: route.slice(1)};
  
}
runRobot(VillageState.random(), betterRobot, []);

function compareRobots(robot1, memory1, robot2, memory2) {
  let taskSteps = { robot1: [], robot2: [] }; // keep track of how many steps it took for each task
  function clearMemory() {
    memory1 = [];
    memory2 = [];
  }
  for (let i = 0; i < 100; i++) {
    let villageState = VillageState.random();
    taskSteps.robot1.push(runRobot(villageState, robot1, memory1));
    taskSteps.robot2.push(runRobot(villageState, robot2, memory2));
    clearMemory();
  }

  let robot1Average = (taskSteps.robot1.reduce((acc, curr) => acc + curr)) / taskSteps.robot1.length;
  let robot2Average = (taskSteps.robot2.reduce((acc, curr) => acc + curr)) / taskSteps.robot2.length;

  return [robot1Average, robot2Average];
}
console.log(compareRobots(betterRobot, [], goalOrientedRobot, []));
