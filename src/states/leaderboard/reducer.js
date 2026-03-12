import { ActionType } from './action';

function leaderboardReducer(leaderboard = [], action = {}) {
  switch (action.type) {
    case ActionType.SET_LEADERBOARD:
      return action.payload.leaderboard;

    default:
      return leaderboard;
  }
}

export default leaderboardReducer;
