import { itunesContainerReducer, itunesContainerTypes, initialState } from '../reducer';

/* eslint-disable default-case, no-param-reassign */
describe('ItunesContainer reducer tests', () => {
  let state;
  beforeEach(() => {
    state = initialState;
  });

  it('should return the initial state', () => {
    expect(itunesContainerReducer(undefined, {})).toEqual(state);
  });

  it('should return the state when an action of type REQUEST_GET_ARTIST is dispatched', () => {
    const artistName = 'post malone';
    const expectedResult = { ...state, artistName };
    expect(itunesContainerReducer(state, { type: itunesContainerTypes.REQUEST_GET_ARTIST, artistName })).toEqual(
      expectedResult
    );
  });

  it('should return the update the state when an action of type SUCCESS_GET_ARTIST is dispatched', () => {
    const data = { trackName: 'sunflower', artistName: 'post malone' };
    const expectedResult = { ...state, itunesData: data };
    expect(
      itunesContainerReducer(state, {
        type: itunesContainerTypes.SUCCESS_GET_ARTIST,
        data
      })
    ).toEqual(expectedResult);
  });

  it('should return the update the state when an action of type FAILURE_GET_ARTIST is dispatched', () => {
    const error = 'something went wrong';
    const expectedResult = { ...state, itunesError: error };
    expect(
      itunesContainerReducer(state, {
        type: itunesContainerTypes.FAILURE_GET_ARTIST,
        error
      })
    ).toEqual(expectedResult);
  });

  it('should ensure that the trackDetails are cleared when an action of type CLEAR_ARTIST_DATA is dispatched', () => {
    const expectedResult = { ...state };
    expect(
      itunesContainerReducer(state, {
        type: itunesContainerTypes.CLEAR_ARTIST_DATA
      })
    ).toEqual(expectedResult);
  });

  it('should return the state when an action of type REQUEST_GET_TRACK_DETAILS is dispatched', () => {
    const trackId = '1440776554';
    const expectedResult = { ...state, trackId };
    expect(itunesContainerReducer(state, { type: itunesContainerTypes.REQUEST_GET_TRACK_DETAILS, trackId })).toEqual(
      expectedResult
    );
  });

  it('should return the update the state when an action of type SUCCESS_GET_TRACK_DETAILS is dispatched', () => {
    const trackDetails = { trackId: 1111, trackName: 'sunflower', artistName: 'post malone' };
    const expectedResult = { ...state, trackDetails };
    expect(
      itunesContainerReducer(state, {
        type: itunesContainerTypes.SUCCESS_GET_TRACK_DETAILS,
        trackDetails
      })
    ).toEqual(expectedResult);
  });

  it('should return the update the state when an action of type FAILURE_GET_TRACK_DETAILS is dispatched', () => {
    const trackError = 'something went wrong';
    const expectedResult = { ...state, trackError };
    expect(
      itunesContainerReducer(state, {
        type: itunesContainerTypes.FAILURE_GET_TRACK_DETAILS,
        trackError
      })
    ).toEqual(expectedResult);
  });
});
