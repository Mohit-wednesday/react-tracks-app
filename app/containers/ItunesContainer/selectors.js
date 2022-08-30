import { createSelector } from 'reselect';
import { initialState } from './reducer';
import get from 'lodash/get';

/**
 * Direct selector to the itunesContainer state domain
 */

export const selectItunesContainerDomain = (state) => state?.itunesContainer || initialState;

export const selectItunesContainer = () => createSelector(selectItunesContainerDomain, (substate) => substate);

export const selectItunesData = () =>
  createSelector(selectItunesContainerDomain, (substate) => get(substate, 'itunesData'));

export const selectItunesError = () =>
  createSelector(selectItunesContainerDomain, (substate) => get(substate, 'itunesError'));

export const selectItunesArtistName = () =>
  createSelector(selectItunesContainerDomain, (substate) => get(substate, 'artistName'));

export const selectTrackData = () =>
  createSelector(selectItunesContainerDomain, (substate) => get(substate, 'trackDetails'));

export const selectTrackId = () => createSelector(selectItunesContainerDomain, (substate) => get(substate, 'trackId'));

export const selectTrackError = () =>
  createSelector(selectItunesContainerDomain, (substate) => get(substate, 'trackError'));

export default selectItunesContainer;
