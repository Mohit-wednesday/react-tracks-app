/* eslint-disable no-console */
/*
 *
 * ItunesContainer reducers
 *
 */
import produce from 'immer';
import { createActions } from 'reduxsauce';

export const { Types: itunesContainerTypes, Creators: itunesContainerCreators } = createActions({
  requestGetArtist: ['artistName'],
  successGetArtist: ['data'],
  failureGetArtist: ['error'],
  requestGetTrackDetails: ['trackId'],
  successGetTrackDetails: ['trackDetails'],
  failureGetTrackDetails: ['trackError'],
  clearTrackDetails: [],
  clearArtistData: []
});

export const initialState = {
  artistName: null,
  itunesData: {},
  itunesError: null,
  trackId: null,
  trackDetails: {},
  trackError: null
};

/* eslint-disable default-case, no-param-reassign */
export const itunesContainerReducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case itunesContainerTypes.REQUEST_GET_ARTIST:
        draft.artistName = action.artistName;
        break;
      case itunesContainerTypes.SUCCESS_GET_ARTIST:
        draft.itunesData = action.data;
        break;
      case itunesContainerTypes.FAILURE_GET_ARTIST:
        draft.itunesError = action.error;
        break;
      case itunesContainerTypes.REQUEST_GET_TRACK_DETAILS:
        draft.trackId = action.trackId;
        break;
      case itunesContainerTypes.SUCCESS_GET_TRACK_DETAILS:
        draft.trackDetails = action.trackDetails;
        break;
      case itunesContainerTypes.FAILURE_GET_TRACK_DETAILS:
        draft.trackError = action.trackError;
        break;
      case itunesContainerTypes.CLEAR_ARTIST_DATA:
        return initialState;
      default:
        return state;
    }
  });
};

export default itunesContainerReducer;
