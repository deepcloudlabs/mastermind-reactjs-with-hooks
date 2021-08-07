import {Move} from "../model/move";

export function initGame(game) {
    game.tries = 0;
    game.counter = 120;
    game.secret = createSecret(game.level);
    console.log(game.secret);
    game.moves = [];
}

export function createMove(guess, secret) {
    let perfectMatch = 0;
    let partialMatch = 0;
    const guessAsString = guess.toString();
    const secretAsString = secret.toString();
    for (let i = 0; i < guessAsString.length; ++i) {
        const g = guessAsString.charAt(i);
        for (let j = 0; j < secretAsString.length; ++j) {
            const s = secretAsString.charAt(j);
            if (s === g) {
                if (i === j)
                    perfectMatch++;
                else
                    partialMatch++;
            }
        }
    }
    return new Move(guess, perfectMatch, partialMatch);
}

export function createDigit(min,max) {
    return Math.floor(Math.random() * (max-min+1)) + min;
}

export function createSecret(level) {
    let digits = [];
    digits.push(createDigit(1,9));
    while (digits.length < level){
        let candidate = createDigit(0,9);
        if (!digits.includes(candidate))
            digits.push(candidate);
    }
    return digits.reduce( (s,digit) => 10*s+digit, 0);
}

