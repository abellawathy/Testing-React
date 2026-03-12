import { asyncLogin } from '../../states/auth/thunk';
import api from '../../utils/api';
import { setAuthUserActionCreator } from '../../states/auth/action';
import Swal from 'sweetalert2';

jest.mock('sweetalert2', () => ({
  fire: jest.fn(),
}));

jest.mock('../../utils/api');

describe('asyncLogin thunk', () => {
  it('should dispatch auth user when login success', async () => {
    api.login.mockResolvedValue({ token: 'token123' });
    api.getOwnProfile.mockResolvedValue({ id: 'user-1' });

    const dispatch = jest.fn();

    await asyncLogin({ email: 'test@mail.com', password: '123' })(dispatch);

    expect(dispatch).toHaveBeenCalledWith(
      setAuthUserActionCreator({ id: 'user-1' })
    );
  });
});
