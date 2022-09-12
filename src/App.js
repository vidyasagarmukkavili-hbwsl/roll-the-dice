import "./App.css";
import React from "react";
import { DEFAULT_GAME_STATE } from "./Redux/Reducers/gameState";
// import { newPlayer, WINNING_POINT } from "../../App";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      buttonState: true,
      diceState: 1,
      countScore: false,
      WINNING_POINT: 100,
      activePlayer: "",
    };

    this.rollTheDice = this.rollTheDice.bind(this);
    this.restartGame = this.restartGame.bind(this);
    this.startGame = this.startGame.bind(this);
    this.scoreCounter = this.scoreCounter.bind(this);
  }

  startGame() {
    if (DEFAULT_GAME_STATE.gameLoaded == false) {
      // console.log("I am in start");

      this.setState((state) => ({
        buttonState: false,
        countScore: false,
        //shouldn't count yet when startGame is pressed
        //it should only start when player gets 6, after start game
      }));
      DEFAULT_GAME_STATE.gameLoaded = true;
    }
    // console.log(DEFAULT_GAME_STATE.gameLoaded);
  }

  restartGame() {
    console.log(DEFAULT_GAME_STATE.gameLoaded);
    // console.log("I am in restart");

    if (DEFAULT_GAME_STATE.gameLoaded == true) {
      this.setState((state) => ({
        buttonState: true,
        countScore: false,
        activePlayer: "",
        //shouldn't count when restartGame is pressed
        //it should only start when player gets 6
      }));
    }

    DEFAULT_GAME_STATE.gameLoaded = false;
    DEFAULT_GAME_STATE.players[0].score = 0;
    DEFAULT_GAME_STATE.players[0].currentScore = 0;
    DEFAULT_GAME_STATE.players[1].score = 0;
    DEFAULT_GAME_STATE.players[1].currentScore = 0;
    DEFAULT_GAME_STATE.count = 1;
    // console.log(this.state.buttonState + "Button state");
  }

  scoreCounter() {
    // diceState

    // console.log("Count Score " + this.state.countScore);

    if (DEFAULT_GAME_STATE.gameLoaded == true) {
      // only go through score counter if game has loaded
      if (this.state.countScore === false && this.state.diceState == 6) {
        // start the program only if these two conditions above are met
        this.setState((state) => ({
          countScore: true,
        }));
        // Now scores can be counted
        console.log("6 registered, scores can be counted");
      }

      if (this.state.countScore == true) {
        console.log("Score counter is being triggered");
        console.log(DEFAULT_GAME_STATE.players[0].isActive);
        console.log(DEFAULT_GAME_STATE.players[1].isActive);

        let tempDiceVal = this.state.diceState;

        if (this.state.diceState == 3) {
          tempDiceVal = 0;
        }
        // Giving a score of 0 if dice value is 3

        if (this.state.diceState == 6) {
          DEFAULT_GAME_STATE.count += 1;
        }
        // Giving an extra turn to the player who gets a 6 by skipping the
        // next count value by adding 1

        if (
          DEFAULT_GAME_STATE.players[0].isActive == true &&
          DEFAULT_GAME_STATE.players[1].isActive == false
        ) {
          console.log("Score updation for p1 is happening");
          // player 01 is active, so update their score
          DEFAULT_GAME_STATE.players[0].currentScore += tempDiceVal;
        } else if (
          DEFAULT_GAME_STATE.players[0].isActive == false &&
          DEFAULT_GAME_STATE.players[1].isActive == true
        ) {
          console.log("Score updation for p2 is happening");
          // player 02 is active, so update their score
          DEFAULT_GAME_STATE.players[1].currentScore += tempDiceVal;
        }
      }
    }

    DEFAULT_GAME_STATE.players[0].score =
      DEFAULT_GAME_STATE.players[0].currentScore;
    DEFAULT_GAME_STATE.players[1].score =
      DEFAULT_GAME_STATE.players[1].currentScore;

    if (
      DEFAULT_GAME_STATE.players[0].score >= this.state.WINNING_POINT ||
      DEFAULT_GAME_STATE.players[1].score >= this.state.WINNING_POINT
    ) {
      console.log("Winning point achieved");

      this.setState((state) => ({
        buttonState: !this.state.buttonState,
      }));

      if (DEFAULT_GAME_STATE.players[0].score >= this.state.WINNING_POINT) {
        this.setState((state) => ({
          activePlayer: "Winner is Player 01",
        }));
      } else if (
        DEFAULT_GAME_STATE.players[1].score >= this.state.WINNING_POINT
      ) {
        this.setState((state) => ({
          activePlayer: "Winner is Player 02",
        }));
      }
    }
  }

  playerSwitcher = () => {
    // DEFAULT_GAME_STATE.count

    console.log(DEFAULT_GAME_STATE.count);
    if (DEFAULT_GAME_STATE.count % 2 == 0) {
      console.log("PLAYER 01 active");
      // player 01

      // this.setState((state) => ({
      //   activePlayer: 1,
      // }));

      DEFAULT_GAME_STATE.players[0].isActive = true;
      DEFAULT_GAME_STATE.players[1].isActive = false;

      // = true;
    } else if (DEFAULT_GAME_STATE.count % 2 == 1) {
      // player 02
      console.log("PLAYER 02 active");

      // this.setState((state) => ({
      //   activePlayer: 2,
      // }));

      DEFAULT_GAME_STATE.players[0].isActive = false;
      DEFAULT_GAME_STATE.players[1].isActive = true;
    }
  };

  // Helper functions

  winner = (score) => {
    if (score >= this.WINNING_POINT) {
      console.log("This player has won!");
    }
  };

  rollTheDice = () => {
    let diceValue = Math.floor(Math.random() * 6 + 1);

    // Changing the state of the dice
    this.setState({
      diceState: diceValue,
    });

    // count++;
    DEFAULT_GAME_STATE.count += 1;

    // This will be the index for the players array while switching

    this.scoreCounter();
    this.playerSwitcher();
    // console.log("Player count is - 0" + ((DEFAULT_GAME_STATE.count % 2) + 1));

    // ^` This is just for testing purposes
  };

  // Rendering of the Game UI:
  render() {
    return (
      <div className="App">
        <div className="main-container">
          <h1 className="Heading">Project 02: Roll the Dice!</h1>

          <div className="container__box">
            <div className="player__box" id="player-01__box">
              <div className="total-score">
                <p className="total-score-text">Total Score</p>
                <p className="player-name">Player 01</p>
                <p className="score-value">
                  {DEFAULT_GAME_STATE.players[0].score}
                </p>
              </div>

              <div className="current-score">
                <p className="current-score-text">Current Score</p>
                <p className="current-score-value">
                  {DEFAULT_GAME_STATE.players[0].currentScore}
                </p>
              </div>
            </div>

            <div className="player__box" id="player-02__box">
              <div className="total-score">
                <p className="total-score-text">Total Score</p>
                <p className="player-name">Player 01</p>
                <p className="score-value">
                  {DEFAULT_GAME_STATE.players[1].score}
                </p>
              </div>

              <div className="current-score">
                <p className="current-score-text">Current Score</p>
                <p className="current-score-value">
                  {DEFAULT_GAME_STATE.players[1].currentScore}
                </p>
              </div>
            </div>

            <div className="controls-container">
              <div className="controls">
                <button
                  className="start-game"
                  id="start-game"
                  disabled={!this.state.buttonState}
                  onClick={this.startGame}
                >
                  Start Game
                </button>
                <button className="start-game" onClick={this.restartGame}>
                  Restart Game
                </button>

                <p className="dice-value">{this.state.diceState}</p>

                <button
                  className="start-game"
                  id="roll-the-dice"
                  onClick={this.rollTheDice}
                  disabled={this.state.buttonState}
                >
                  Roll the Dice
                </button>
                <div className="display-winner">
                  <p className="winner-text">{this.state.activePlayer}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
