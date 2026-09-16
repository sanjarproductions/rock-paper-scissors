import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import scissorsLight from "./assets/2.svg";
import rockLight from "./assets/3.svg";
import darkModeIcon from "./assets/moon.svg";
import paperDark from "./assets/paper-dark.svg";
import paperLight from "./assets/paper-light.svg";
import rockDark from "./assets/rock.svg";
import scissorsDark from "./assets/scissors-dark.svg";
import lightModeIcon from "./assets/sun.svg";
import playerMove from "./redux/actions/playerMoveActions";
import robotMove from "./redux/actions/robotMoveActions";
import roundResetActions from "./redux/actions/roundResetActions";
import roundResult from "./redux/actions/roundResultActions";
import themeActions from "./redux/actions/themeActions";

import styles from "./App.module.css";

function App() {
  const dispatch = useDispatch();
  const moves = ["rock", "paper", "scissors"];
  const [preview, setPreview] = useState(true);
  // redux
  const moveOfPlayer = useSelector((state) => state.playersChoise);
  const moveOfRobot = useSelector((state) => state.moveOfRobot);
  const theme = useSelector((state) => state.themeChange);
  const gameResult = useSelector((state) => state.roundResult);

  const startGame = () => {
    setPreview(!preview);
  };

  const changeTheme = () => {
    dispatch(themeActions());
  };

  const play = (move) => {
    if (move == "rock") {
      dispatch(playerMove(move));
    } else if (move == "paper") {
      dispatch(playerMove(move));
    } else {
      dispatch(playerMove(move));
    }

    // random choise of the robot
    let robotsMove = moves[Math.floor(Math.random() * moves.length)];
    dispatch(robotMove(robotsMove));

    // player's Move, robot's Move
    win(move, robotsMove);
  };

  function win(player, robot) {
    //  DRAW
    if (player == "rock" && robot == "rock") {
      dispatch(roundResult("draw"));
    } else if (player == "paper" && robot == "paper") {
      dispatch(roundResult("draw"));
    } else if (player == "scissors" && robot == "scissors") {
      dispatch(roundResult("draw"));
    }

    // for the ROCK
    else if (player == "rock" && robot == "paper") {
      dispatch(roundResult("computerWon"));
    } else if (player == "rock" && robot == "scissors") {
      dispatch(roundResult("playerWon"));
    }

    // for the PAPER
    else if (player == "paper" && robot == "rock") {
      dispatch(roundResult("playerWon"));
    } else if (player == "paper" && robot == "scissors") {
      dispatch(roundResult("computerWon"));
    }

    // for the SCISSORS
    else if (player == "scissors" && robot == "paper") {
      dispatch(roundResult("playerWon"));
    } else if (player == "scissors" && robot == "rock") {
      dispatch(roundResult("computerWon"));
    }
  }

  const resetScore = () => {
    dispatch(roundResetActions());
    dispatch(playerMove(""));
    dispatch(robotMove(""));
  };

  const imagesDark = {
    rock: rockDark,
    paper: paperDark,
    scissors: scissorsDark,
  };

  const imagesLight = {
    rock: rockLight,
    paper: paperLight,
    scissors: scissorsLight,
  };
  const images = theme ? imagesDark : imagesLight;

  const results = {
    draw: "DRAW!",
    computerWon: "COMPUTER WON!",
    playerWon: "YOU WON!",
  };

  if (preview) {
    return (
      <>
        <div className={theme ? styles.wrapper : styles["wrapper-dark"]}>
          <div className={styles.theme__toggle}>
            {theme ? (
              <button className={styles.toggle__btn} onClick={changeTheme}>
                <img src={darkModeIcon} alt="" />
              </button>
            ) : (
              <button className={styles.toggle__btn} onClick={changeTheme}>
                <img src={lightModeIcon} alt="" />
              </button>
            )}
          </div>

          <div className={styles.popup__container}>
            <div className={theme ? "content" : "content-dark"}>
              <button onClick={startGame}>Play</button>
              <b>
                Rock Paper Scissors <br /> The game
              </b>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className={theme ? styles.wrapper : styles["wrapper-dark"]}>
          <div className={styles.theme__toggle}>
            {theme ? (
              <button className={styles.toggle__btn} onClick={changeTheme}>
                <img src={darkModeIcon} alt="" />
              </button>
            ) : (
              <button className={styles.toggle__btn} onClick={changeTheme}>
                <img src={lightModeIcon} alt="" />
              </button>
            )}
          </div>

          <div className={styles.container}>
            <h1>Rock Paper Scissors</h1>
            <div className={styles["reset-score"]}>
              <p
                style={
                  gameResult.robotScore == 0 && gameResult.playerScore == 0
                    ? { visibility: "hidden" }
                    : { visibility: "visible", cursor: "pointer" }
                }
                className={styles.title}
                onClick={resetScore}
              >
                RESET THE SCORE
              </p>

              <div className={styles.players}>
                <p className={styles.score}>
                  PLAYER SCORE: {gameResult.playerScore}
                </p>
                <p className={styles.score}>
                  COMPUTER SCORE: {gameResult.robotScore}
                </p>
              </div>
            </div>

            <div className={styles["show-winner"]}>
              {gameResult.result ? results[gameResult.result] : ""}
            </div>

            <div className={styles.hands}>
              <img
                className={moveOfPlayer ? styles["no-shake"] : styles.shake}
                src={moveOfPlayer ? images[moveOfPlayer] : images["rock"]}
                alt=""
              />
              <p>vs</p>
              <img
                className={moveOfPlayer ? styles["no-shake"] : styles.shake}
                src={moveOfRobot ? images[moveOfRobot] : images["rock"]}
                alt=""
              />
            </div>

            <div className={styles.controlls}>
              <p
                style={
                  moveOfPlayer
                    ? { visibility: "hidden" }
                    : { visibility: "visible" }
                }
              >
                Choose your move, rock paper or scissors?
              </p>
              <div className={styles["btns-wrapper"]}>
                <button onClick={() => play("rock")}>ROCK</button>
                <button onClick={() => play("paper")}>PAPER</button>
                <button onClick={() => play("scissors")}>SCISSORS</button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default App;
