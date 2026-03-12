import api from '../../utils/api';
import { setLeaderboardActionCreator } from './action';

export default function asyncReceiveLeaderboard() {
  return async (dispatch) => {
    const leaderboard = await api.getLeaderboard();

    dispatch(setLeaderboardActionCreator(leaderboard));
  };
}
