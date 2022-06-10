/**
 * Test itunesContainer sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { takeLatest, call, put } from 'redux-saga/effects';
import itunesContainerSaga, { getItunesData, getTrackData } from '../saga';
import { itunesContainerTypes, itunesContainerCreators } from '../reducer';
import { getArtists, getTrack } from '@app/services/itunesApi';
import { apiResponseGenerator } from '@app/utils/testUtils';
import { setIntl, translate } from '@app/components/IntlGlobalProvider/index';
import getIntl from '@app/utils/getIntl';
const { successGetTrackDetails } = itunesContainerCreators;

describe('ItunesContainer saga tests', () => {
  const generator = itunesContainerSaga();
  const artistName = 'post malone';
  const trackId = '1440776554';
  let getItunesDataGenerator = getItunesData({ artistName });
  let getTrackDataGenerator = getTrackData({ trackId });

  beforeAll(() => {
    setIntl(getIntl());
  });

  it('should start task to watch for REQUEST_GET_ARTIST action', () => {
    expect(generator.next().value).toEqual(takeLatest(itunesContainerTypes.REQUEST_GET_ARTIST, getItunesData));
  });

  it('should ensure that the action FAILURE_GET_ARTIST is dispatched when api call fails', () => {
    const response = getItunesDataGenerator.next().value;
    expect(response).toEqual(call(getArtists, artistName));
    const itunesError = translate('something_went_wrong');
    expect(getItunesDataGenerator.next(apiResponseGenerator(false, itunesError)).value).toEqual(
      put({ type: itunesContainerTypes.FAILURE_GET_ARTIST, error: itunesError })
    );
  });

  it('should ensure that the action SUCCESS_GET_ARTIST is dispatched when api call success', () => {
    getItunesDataGenerator = getItunesData({ artistName });
    const response = getItunesDataGenerator.next().value;
    expect(response).toEqual(call(getArtists, artistName));
    const itunesResponse = {
      resultCount: 1,
      results: [{ artistName }]
    };
    expect(getItunesDataGenerator.next(apiResponseGenerator(true, itunesResponse)).value).toEqual(
      put({
        type: itunesContainerTypes.SUCCESS_GET_ARTIST,
        data: itunesResponse
      })
    );
  });

  it('should start task to watch for REQUEST_GET_TRACK_DETAILS action', () => {
    expect(generator.next().value).toEqual(takeLatest(itunesContainerTypes.REQUEST_GET_TRACK_DETAILS, getTrackData));
  });

  it('should ensure that the action FAILURE_GET_TRACK_DETAILS is dispatched when api call fails', () => {
    const response = getTrackDataGenerator.next().value;
    expect(response).toEqual(call(getTrack, trackId));
    const trackError = translate('something_went_wrong');
    expect(getTrackDataGenerator.next(apiResponseGenerator(false, trackError)).value).toEqual(
      put({ type: itunesContainerTypes.FAILURE_GET_TRACK_DETAILS, trackError })
    );
  });

  it('should ensure that the action SUCCESS_GET_TRACK_DETAILS is dispatched when api call success', () => {
    getTrackDataGenerator = getTrackData({ trackId });
    const response = getTrackDataGenerator.next().value;
    expect(response).toEqual(call(getTrack, trackId));
    const itunesResponse = {
      resultCount: 1,
      results: [{ trackId }]
    };
    expect(getTrackDataGenerator.next(apiResponseGenerator(true, itunesResponse)).value).toEqual(
      put(successGetTrackDetails(itunesResponse.results[0]))
    );
  });
});
