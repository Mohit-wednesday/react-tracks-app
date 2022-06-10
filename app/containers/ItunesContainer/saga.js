import { takeLatest, call, put } from 'redux-saga/effects';
import { itunesContainerTypes, itunesContainerCreators } from './reducer';
import { getArtists, getTrack } from '@services/itunesApi';

const { REQUEST_GET_ARTIST, REQUEST_GET_TRACK_DETAILS } = itunesContainerTypes;
const { successGetArtist, failureGetArtist, successGetTrackDetails, failureGetTrackDetails } = itunesContainerCreators;
export function* getItunesData(action) {
  const response = yield call(getArtists, action.artistName);
  const { data, ok } = response;
  if (ok) {
    yield put(successGetArtist(data));
  } else {
    yield put(failureGetArtist(data));
  }
}
export function* getTrackData(action) {
  const response = yield call(getTrack, action.trackId);
  const { data, ok } = response;
  if (ok) {
    yield put(successGetTrackDetails(data.results[0]));
  } else {
    yield put(failureGetTrackDetails(data));
  }
}

export default function* itunesContainerSaga() {
  yield takeLatest(REQUEST_GET_ARTIST, getItunesData);
  yield takeLatest(REQUEST_GET_TRACK_DETAILS, getTrackData);
}
