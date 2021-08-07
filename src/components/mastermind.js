import {MoveEvaluation} from "./move-evaluation";
import {CardHeader} from "../bootstrap/card_header";
import Badge from "../bootstrap/badge";
import {ProgressBar} from "../bootstrap/progress-bar";
import {useState, useEffect} from "react";
import {createSecret, initGame, createMove} from "./game-util"

export default function Mastermind() {
    let initialGameState = {
        level: 3,
        tries: 0,
        secret: createSecret(3),
        moves: [],
        counter: 120,
        guess: 145,
        statistics: {
            wins: 0,
            loses: 0
        }
    };

    let localStorageGame = localStorage.getItem("mastermind");
    if (localStorageGame === null || localStorageGame === undefined) {
        localStorage.setItem("mastermind", JSON.stringify(initialGameState));
    } else {
        initialGameState = JSON.parse(localStorageGame);
    }
    let [game, setGame] = useState(initialGameState);

    useEffect(() => {
        localStorage.setItem("mastermind", JSON.stringify(game));
    });

    useEffect(() => {
        let timerId = setInterval(countdown, 1000);
        return () => {
            clearInterval(timerId);
        }
    });


    function handleInputChange(event) {
        let guess = Number(event.target.value);
        setGame({...game, guess});
    }

    function countdown() {
        let newGame = {...game};
        newGame.counter--;
        if (newGame.counter <= 0) {
            initGame(newGame);
            newGame.statistics.loses++;
        }
        setGame(newGame);
    }


    function play() {
        let newGame = {...game};
        newGame.tries++;
        if (Number(newGame.guess) === newGame.secret) {
            newGame.level++;
            if (newGame.level >= 10) {
                newGame.statistics.wins++;
            }
            initGame(newGame);
        } else {
            if (newGame.tries >= 10) {
                newGame.statistics.loses++;
                initGame(newGame);
            } else {
                newGame.moves.push(createMove(game.guess, game.secret))
            }
        }
        setGame(newGame);
    }

    return (
        <div className="container">
            <div className="card">
                <CardHeader title="Game Console"/>
                <div className="card-body">
                    <Badge label="Game Level" value={game.level}/>
                    <Badge label="Tries" value={game.tries}/>
                    <ProgressBar label="Counter" value={game.counter} valueMax={120}/>
                    <div className="form-group">
                        <label htmlFor="guess">Guess:</label>
                        <input type="text"
                               id="guess"
                               className="form-control"
                               onChange={handleInputChange}
                               value={game.guess}/>
                    </div>
                    <div className="form-group">
                        <button onClick={play}
                                className="btn btn-success">Play
                        </button>
                    </div>
                </div>
            </div>
            <p></p>
            <div className="card">
                <CardHeader title="Game Statistics"/>
                <div className="card-body">
                    <Badge label="Wins" value={game.statistics.wins}/>
                    <Badge label="Loses" value={game.statistics.loses}/>
                    <Badge label="Total" value={game.statistics.wins + game.statistics.loses}/>
                </div>
            </div>
            <p></p>
            <div className="card">
                <CardHeader title="Moves"/>
                <div className="card-body">
                    <table className="table table-bordered table-hover">
                        <thead>
                        <tr>
                            <th>No</th>
                            <th>Guess</th>
                            <th>Message</th>
                        </tr>
                        </thead>
                        <tbody>{
                            game.moves.map((move, index) =>
                                <tr key={move.guess * index}>
                                    <td>{index + 1}</td>
                                    <td>{move.guess}</td>
                                    <td><MoveEvaluation partial={move.partialMatch}
                                                        perfect={move.perfectMatch}/></td>
                                </tr>
                            )
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

