import MockAdapter from 'axios-mock-adapter';
import { getApiClient } from '@utils/apiUtils';
import { getArtists } from '../itunesApi';

describe('itunesApi tests', () => {
  const artistName = 'post malone';
  it(`should make the api call to "/search?term=${artistName}`, async () => {
    const mock = new MockAdapter(getApiClient().axiosInstance);
    const data = [
      {
        resultCount: 1,
        results: [{ artistName }]
      }
    ];
    mock.onGet(`/search?term=${artistName}`).reply(200, data);
    const res = await getArtists(artistName);
    expect(res.data).toEqual(data);
  });
});
