/**
 *
 * Stories for TracksGrid
 *
 * @see https://github.com/storybookjs/storybook
 *
 */

import React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';
import TracksGrid from '../index';
import { BrowserRouter } from 'react-router-dom';

const testData = {
  resultCount: 2,
  results: [
    {
      trackId: 1,
      trackName: 'sunflower',
      artistName: 'post malone'
    },
    {
      trackId: 2,
      trackName: 'No lie',
      artistName: 'dua'
    }
  ]
};

storiesOf('TracksGrid').add('simple', () => (
  <BrowserRouter>
    {' '}
    <TracksGrid id={text('id', 'TracksGrid')} itunesData={testData} />
  </BrowserRouter>
));
