/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/**
 *
 * Tests for TrackCard
 *
 */

import React from 'react';
import { fireEvent, waitFor } from '@testing-library/dom';
import { renderProvider, timeout, createSpyOnAudio } from '@utils/testUtils';
import TrackCard from '../index';
import history from '@app/utils/history';
import testData from '../testData';
import { translate } from '@app/components/IntlGlobalProvider/index';

describe('<TrackCard />', () => {
  let handleOnClick = jest.fn();
  let playSpy;
  let pauseSpy;

  beforeAll(() => {
    playSpy = createSpyOnAudio('play');
    pauseSpy = createSpyOnAudio('pause');
  });

  beforeEach(() => {
    handleOnClick = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const MockTrackCard = () => {
    return <TrackCard {...testData} handleOnClick={handleOnClick} />;
  };

  it('should render and match the snapshot', () => {
    const { baseElement } = renderProvider(<MockTrackCard />, history);
    expect(baseElement).toMatchSnapshot();
  });

  it('should contain 1 TrackCard component', () => {
    const { getAllByTestId } = renderProvider(<MockTrackCard />, history);
    expect(getAllByTestId('track-card').length).toBe(1);
  });

  it('should render trackName and artistName', () => {
    const { getByTestId } = renderProvider(<MockTrackCard />, history);
    expect(getByTestId('artist-name')).toHaveTextContent(testData.artistName);
    expect(getByTestId('track-name')).toHaveTextContent(testData.trackName);
  });

  it('should call handleOnClick and handleAudio callbacks accordingly', async () => {
    let audio;
    let handleAudioSpy = jest.fn();
    const { getByTestId } = renderProvider(<MockTrackCard />, history);
    audio = getByTestId('audio');
    fireEvent.click(getByTestId('track-control-button'), { onClick: handleAudioSpy() });
    await timeout(500);

    expect(handleOnClick).toBeCalledWith({ current: audio });

    fireEvent.click(getByTestId('track-control-button'), { onClick: handleAudioSpy() });
    await timeout(500);

    expect(handleAudioSpy).toBeCalled();
    expect(handleOnClick).toBeCalledWith({ current: audio });
  });

  it('should play the audio if the play pause button clicked', async () => {
    const { getByTestId } = renderProvider(<MockTrackCard />, history);
    fireEvent.click(getByTestId('track-control-button'));
    await waitFor(() => expect(playSpy).toHaveBeenCalledTimes(1));
  });

  it('should pause the playing audio if the play pause button clicked', async () => {
    const { getByTestId } = renderProvider(<MockTrackCard />, history);
    fireEvent.click(getByTestId('track-control-button'));
    await waitFor(() => expect(playSpy).toHaveBeenCalledTimes(1));

    fireEvent.click(getByTestId('track-control-button'));
    await waitFor(() => expect(pauseSpy).toHaveBeenCalledTimes(1));
  });
  it('should render the fallback text messages if data is empty', () => {
    const { getByTestId } = renderProvider(<TrackCard />);
    expect(getByTestId('track_name_unavailable')).toHaveTextContent(translate('track_name_unavailable'));
    expect(getByTestId('artist_name_unavailable')).toHaveTextContent(translate('artist_name_unavailable'));
  });
});
