/**
 *
 * Tests for TrackCard
 *
 */

import React from 'react';
// import { fireEvent } from '@testing-library/dom'
import { renderProvider } from '@utils/testUtils';
import TrackCard from '../index';
import history from '@app/utils/history';

describe('<TrackCard />', () => {
  let handleOnClick = jest.fn();
  const track = {
    trackName: 'Sunflower',
    artistName: 'Post Malone',
    artworkUrl100: 'stub-image-url',
    previewUrl: 'stub-preview-url',
    trackId: 123
  };

  beforeEach(() => {
    handleOnClick = jest.fn();
  });

  const MockTrackCard = () => {
    return <TrackCard track={track} handleOnClick={handleOnClick} />;
  };

  it('should render and match the snapshot', () => {
    const { baseElement } = renderProvider(<MockTrackCard />, history);
    expect(baseElement).toMatchSnapshot();
  });

  it('should contain 1 TrackCard component', () => {
    const { getAllByTestId } = renderProvider(<MockTrackCard />, history);
    expect(getAllByTestId('track-card').length).toBe(1);
  });
});
