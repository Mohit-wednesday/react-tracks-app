/**
 *
 * Tests for TracksGrid
 *
 */

import React from 'react';
import { waitFor, fireEvent } from '@testing-library/dom';
import { renderWithIntl, renderProvider, createSpyOnAudio } from '@utils/testUtils';
import TracksGrid from '../index';
import { translate } from '@app/components/IntlGlobalProvider';

describe('<TracksGrid />', () => {
  const artistName = 'post malone';
  const previewUrl =
    'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/c3/30/11/c3301120-3e69-9a93-3cf7-bdb49133d40b/mzaf_1948113783309339626.plus.aac.p.m4a';
  let testData = {
    resultCount: 1,
    results: [{ trackId: 111, trackName: 'sunflower', artistName, previewUrl }]
  };
  let playSpy;

  beforeEach(() => {
    playSpy = createSpyOnAudio('play');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render and match the snapshot', () => {
    const { baseElement } = renderWithIntl(<TracksGrid />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should contain 1 TracksGrid component', () => {
    const { getAllByTestId } = renderWithIntl(<TracksGrid />);
    expect(getAllByTestId('tracks-grid').length).toBe(1);
  });

  it('should render and match the artist name', () => {
    const { getByTestId } = renderProvider(
      <TracksGrid artistName={artistName} loading={false} itunesData={testData} />
    );
    expect(getByTestId('itunes-artist-name')).toHaveTextContent(translate('search_query', { artistName }));
  });

  it('should ensure and render TrackCard', () => {
    const { getByTestId } = renderProvider(
      <TracksGrid itunesData={testData} artistName={artistName} loading={false} />
    );
    expect(getByTestId('track-card')).toBeInTheDocument();
  });

  it('should set currentTrackRef to the playing audioRef', async () => {
    const { getByTestId } = renderProvider(<TracksGrid itunesData={testData} />);

    fireEvent.click(getByTestId('track-control-button'));
    await waitFor(() => expect(playSpy).toBeCalled());
  });

  it('should set currentTrackRef to null if the audio paused', async () => {
    const pauseSpy = createSpyOnAudio('pause');
    const { getByTestId } = renderProvider(<TracksGrid itunesData={testData} />);

    fireEvent.click(getByTestId('track-control-button'));
    await waitFor(() => expect(playSpy).toBeCalledTimes(1));
    Object.defineProperty(window.HTMLAudioElement.prototype, 'paused', { value: true, writable: true });
    fireEvent.click(getByTestId('track-control-button'));
    await waitFor(() => expect(pauseSpy).toBeCalledTimes(1));
  });

  it('should set currentTrackRef to null if the audio ended', async () => {
    const pauseSpy = createSpyOnAudio('pause');
    Object.defineProperty(window.HTMLAudioElement.prototype, 'playbackRate', { value: 16 });
    const { getByTestId } = renderProvider(<TracksGrid itunesData={testData} />);

    fireEvent.click(getByTestId('track-control-button'));
    await waitFor(() => expect(playSpy).toBeCalledTimes(1));
    Object.defineProperty(window.HTMLAudioElement.prototype, 'ended', { value: true, writable: true });
    fireEvent.click(getByTestId('track-control-button'));
    await waitFor(() => expect(pauseSpy).toBeCalledTimes(1));
  });

  it('should change currentTrackRef if another track is played', async () => {
    testData = {
      resultCount: 2,
      results: [
        { trackId: 111, trackName: 'sunflower', artistName, previewUrl },
        { trackId: 222, trackName: 'sunflower', artistName, previewUrl }
      ]
    };

    const { getAllByTestId } = renderProvider(<TracksGrid itunesData={testData} />);
    const toggleButtons = getAllByTestId('track-control-button');
    fireEvent.click(toggleButtons[0]);
    await waitFor(() => expect(playSpy).toBeCalledTimes(1));
    fireEvent.click(toggleButtons[1]);
    await waitFor(() => expect(playSpy).toBeCalledTimes(2));
  });
});
