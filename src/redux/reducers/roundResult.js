function roundResult(
  state = { playerScore: 0, robotScore: 0, result: "" },
  action,
) {
  switch (action.type) {
    case "ROUND_RESULT":
      if (action.payload == "draw") {
        return {
          ...state,
          result: "draw",
          playerScore: state.playerScore + 1,
          robotScore: state.robotScore + 1,
        };
      } else if (action.payload == "playerWon") {
        return {
          ...state,
          result: "playerWon",
          playerScore: state.playerScore + 1,
        };
      } else if (action.payload == "computerWon") {
        return {
          ...state,
          result: "computerWon",
          robotScore: state.robotScore + 1,
        };
      }
      return state;
    case "RESET_SCORE":
      return { playerScore: 0, robotScore: 0, result: "" };
    default:
      return state;
  }
}
export default roundResult;
