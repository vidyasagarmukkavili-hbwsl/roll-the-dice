import { ROLL_DICE, HOLD_DICE, START_GAME } from '../Actions/actions';
import { newPlayer, WINNING_POINT } from '../../App';

// DEFAULT_GAME_STATE.players[1].score

export const DEFAULT_GAME_STATE = {
    gameLoaded: false ,   
    // this is to see if start game has been pressed
    count: 1,
    players: [
        {
        name: 'Player 01', 
        score: 0, 
        currentScore: 0, 
        isActive: false },
        { 
        name: 'Player 02', 
        score: 0, 
        currentScore: 0, 
        isActive: true 
        }
    ]
};



// export default function reducer(state = DEFAULT_GAME_STATE, action) {


//         switch(action.type){
                
//             case START_GAME:
//             let activePlayer = "Player 01"
//             // do something
//             // disable the start button
//             // state.gameLoaded = true;
//             break;


//             case ROLL_DICE:
//                 state.players.map(() =>{
                    

//                 })
//             return player
//             break;
//         }

//             };