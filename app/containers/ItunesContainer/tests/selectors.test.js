/* eslint-disable no-console */
import { initialState } from '../reducer';
import {
  selectItunesArtistName,
  selectItunesContainer,
  selectItunesData,
  selectItunesError,
  selectTrackData,
  selectTrackId,
  selectTrackError,
  selectItunesContainerDomain
} from '../selectors';

describe('ItunesContainer selector tests', () => {
  let mockedState;
  let artistName;
  let itunesData;
  let itunesError;
  let trackDetails;
  let trackId;
  let trackError;

  beforeEach(() => {
    trackId = 1111;
    artistName = 'post malone';
    itunesData = { trackName: 'sunflower', artistName };
    trackDetails = { trackName: 'sunflower', artistName };
    mockedState = {
      itunesContainer: {
        artistName,
        itunesData,
        itunesError,
        trackDetails,
        trackId,
        trackError
      }
    };
  });

  it('should select the itunes container state', () => {
    const itunesContainerSelector = selectItunesContainer();
    expect(itunesContainerSelector(mockedState)).toEqual(mockedState.itunesContainer);
  });

  it('should return the initial state if no state is passed', () => {
    expect(selectItunesContainerDomain()).toEqual(initialState);
  });

  it('should select the itunesData state', () => {
    const itunesDataSelector = selectItunesData();
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

  it('should select the trackDetails state', () => {
    const itunesTrackDetailsSelector = selectTrackData();
    expect(itunesTrackDetailsSelector(mockedState)).toEqual(trackDetails);
  });
  it('should select the trackId state', () => {
    const itunesTrackIdSelector = selectTrackId();
    expect(itunesTrackIdSelector(mockedState)).toEqual(trackId);
  });
  it('should select the trackError state', () => {
    const itunesTrackErrorSelector = selectTrackError();
    expect(itunesTrackErrorSelector(mockedState)).toEqual(trackError);
  });
});
