# Reactjs Implementation of MasterMind Game using React Hooks

**Mastermind** is a *simple number guessing game*. Computer picks a **3-digit** random number where all digits are **distinct**. This number is a **secret** and a player tries to find the secret by guessing. Computer guides the player with a hint message summarizing how much the guess is close the secret. Assume that the secret number is **549** and player's first move is **123**. Computer evaluates the input **123** and produces **"No Match!"** message, hence there is no digit matched! Player's next move is **456**. Computer again evaluates the input **456** and produces the message **"-2"**: The digits **4** and **5** are all matched but at the very wrong places! Player's next move is **567**. Computer again evaluates the input **567** and produces the message **"+1"**: Only one digit is matched at the correct place! Player's next move is **584**. Computer again evaluates the input **584** and produces the message **"+1-1"**: The digit **5** is matched at the correct place and the digit **4** is matched at the wrong place.  Player's next move is 540. Computer again evaluates the input 540 and produces the message **"+2"**: The digits **5** and **4** are all matched at the correct places! Finally the player inputs **549** and wins the game!

Initial state is initialized from **localStroage** if a value is available for the key **"mastermind"**. If there is a change in the state, it is immediatly stored in **localStorage** using **setEffect()**:

```js
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

```

In order to make the game more **pleasant** for the player we *challange the user* with **the time limit**:

```js
    useEffect(() => {
        let timerId = setInterval(countdown, 1000);
        return () => {
            clearInterval(timerId);
        }
    });
```

You can use a single state with a complex object or multiple states using **useState()**:

```js
    let [game, setGame] = useState({
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
    });
```

versus

```js
    let [level, setLevel] = useState(3);
    let [tries, setTries] = useState(0);
    let [moves, setMoves] = useState([]);
    . . .
    let [guess, setGuess] = useState(123);
```

Every time you call the setXYZ() methods the component re-renders. Hence the single state case triggers just one re-rendering. Multiple re-rendering has a little drawback: the cost of function call. 

Unlike the **setState()** in class components, the **setState()** returned from **useState()** doesn't merge objects with existing state, it replaces the object entirely. If you want to do a merge, you would need to read the previous state and merge it with the new values yourself. You may try to **useReducer()** or ES6 object destructuring syntax. 
