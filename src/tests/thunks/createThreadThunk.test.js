import { asyncCreateThread } from '../../states/threads/thunk';
import api from '../../utils/api';

jest.mock('sweetalert2', () => ({
  fire: jest.fn(),
}));

jest.mock('../../utils/api', () => ({
  createThread: jest.fn(),
}));

describe('asyncCreateThread thunk', () => {
  it('should dispatch action when create thread success', async () => {
    const fakeThread = {
      id: 'thread-1',
      title: 'Thread Test',
      body: 'Isi thread',
      category: 'testing',
    };

    api.createThread.mockResolvedValue(fakeThread);

    const dispatch = jest.fn();

    await asyncCreateThread({
      title: 'Thread Test',
      body: 'Isi thread',
      category: 'testing',
    })(dispatch);

    expect(dispatch).toHaveBeenCalled();
  });
});
