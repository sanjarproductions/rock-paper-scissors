function moveOfRobot(state = "", action) {
  switch (action.type) {
    case "SET_ROBOT_MOVE":
      return action.payload;
    default:
      return state;
  }
}
export default moveOfRobot;
