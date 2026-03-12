import loadingReducer from '../../states/loading/reducer';
import { ActionType } from '../../states/loading/action';

describe('loadingReducer', () => {
  it('should return true when SHOW_LOADING', () => {
    const action = { type: ActionType.SHOW_LOADING };

    const nextState = loadingReducer(false, action);

    expect(nextState).toBe(true);
  });

  it('should return false when HIDE_LOADING', () => {
    const action = { type: ActionType.HIDE_LOADING };

    const nextState = loadingReducer(true, action);

    expect(nextState).toBe(false);
  });
});
