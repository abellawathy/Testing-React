import { asyncPopulateThreads } from '../../states/threads/thunk';
import api from '../../utils/api';
import { setThreadsActionCreator } from '../../states/threads/action';

jest.mock('sweetalert2', () => ({
  fire: jest.fn(),
}));

jest.mock('../../utils/api', () => ({
  getThreads: jest.fn(),
  getUsers: jest.fn(),
}));

describe('asyncPopulateThreads thunk', () => {
  it('should dispatch threads when success', async () => {
    const fakeThreads = [
      { id: 'thread-1', ownerId: 'user-1', title: 'Thread Test' },
    ];

    const fakeUsers = [{ id: 'user-1', name: 'Nabila' }];

    api.getThreads.mockResolvedValue(fakeThreads);
    api.getUsers.mockResolvedValue(fakeUsers);

    const dispatch = jest.fn();

    await asyncPopulateThreads()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(
      setThreadsActionCreator([
        {
          ...fakeThreads[0],
          owner: fakeUsers[0],
        },
      ])
    );
  });
});
