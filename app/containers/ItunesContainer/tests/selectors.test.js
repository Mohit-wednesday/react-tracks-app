/* eslint-disable no-console */
import { selectItunesArtistName, selectItunesContainer, selectItunesData, selectItunesError } from '../selectors';

describe('ItunesContainer selector tests', () => {
  let mockedState;
  let artistName;
  let itunesData;
  let itunesError;

  beforeEach(() => {
    artistName = 'post malone';
    itunesData = { trackName: 'sunflower', artistName };
    mockedState = {
      itunesContainer: {
        artistName,
        itunesData,
        itunesError
      }
    };
  });

  it('should select the itunes container state', () => {
    const itunesContainerSelector = selectItunesContainer();
    expect(itunesContainerSelector(mockedState)).toEqual(mockedState.itunesContainer);
  });

  it('should select the itunesData state', () => {
    const itunesDataSelector = selectItunesData();
    console.log(itunesDataSelector(mockedState));
    expect(itunesDataSelector(mockedState)).toEqual(itunesData);
  });

  it('should select the artistName state', () => {
    const itunesArtistNameSelector = selectItunesArtistName();
    expect(itunesArtistNameSelector(mockedState)).toEqual(artistName);
  });

  it('should select the itunesError state', () => {
    const itunesErrorSelector = selectItunesError();
    expect(itunesErrorSelector(mockedState)).toEqual(itunesError);
  });
});
