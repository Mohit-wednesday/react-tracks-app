/**
 *
 * Tests for TrackDetails
 *
 */

import React from 'react';
// import { fireEvent } from '@testing-library/dom'
import { renderProvider } from '@utils/testUtils';
import TrackDetails from '../index';

describe('<TrackDetails />', () => {
  it('should render and match the snapshot', () => {
    const { baseElement } = renderProvider(<TrackDetails />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should contain 1 TrackDetails component', () => {
    const { getAllByTestId } = renderProvider(<TrackDetails />);
    expect(getAllByTestId('track-details').length).toBe(1);
  });
});
