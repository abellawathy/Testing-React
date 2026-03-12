const ActionType = {
  SET_LEADERBOARD: 'SET_LEADERBOARD',
};

function setLeaderboardActionCreator(leaderboard) {
  return {
    type: ActionType.SET_LEADERBOARD,
    payload: {
      leaderboard,
    },
  };
}

export { ActionType, setLeaderboardActionCreator };
