import { generateApiClient } from '@utils/apiUtils';
const itunesApi = generateApiClient('itunes');

export const getArtists = (artistName) => itunesApi.get(`/search?term=${artistName}`);
export const getTrack = (trackId) => itunesApi.get(`/lookup?id=${trackId}`);
