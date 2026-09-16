function moveOfPlayer(state = "", action) {
  switch (action.type) {
    case "SET_PLAYER_MOVE":
      return action.payload;
    default:
      return state;
  }
}

export default moveOfPlayer;
