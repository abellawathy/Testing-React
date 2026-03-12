import authReducer from '../../states/auth/reducer';
import { ActionType } from '../../states/auth/action';

describe('authReducer', () => {
  it('should return initial state when given unknown action', () => {
    const initialState = null;

    const action = { type: 'UNKNOWN' };

    const nextState = authReducer(initialState, action);

    expect(nextState).toEqual(initialState);
  });

  it('should set auth user when SET_AUTH_USER', () => {
    const action = {
      type: ActionType.SET_AUTH_USER,
      payload: {
        authUser: {
          id: 'user-1',
          name: 'Dicoding',
        },
      },
    };

    const nextState = authReducer(null, action);

    expect(nextState).toEqual(action.payload.authUser);
  });
});
