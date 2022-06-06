/**
 *
 * Stories for TrackCard
 *
 * @see https://github.com/storybookjs/storybook
 *
 */

import React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';
import TrackCard from '../index';
import { BrowserRouter } from 'react-router-dom';

const track = {
  trackName: 'Sunflower',
  artworkUrl100:
    'https://is2-ssl.mzstatic.com/image/thumb/Music125/v4/4b/30/2c/4b302cb6-7a14-5464-4e97-0577e9d0be49/18UMGIM82277.rgb.jpg/100x100bb.jpg',
  artistName: 'post malone'
};
storiesOf('TrackCard').add('simple', () => (
  <BrowserRouter>
    <TrackCard id={text('id', 'TrackCard')} track={track} />
  </BrowserRouter>
));
