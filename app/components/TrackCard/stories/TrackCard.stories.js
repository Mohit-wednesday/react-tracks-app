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
import testData from '../testData';

storiesOf('TrackCard').add('simple', () => (
  <BrowserRouter>
    <TrackCard id={text('id', 'TrackCard')} track={testData} />
  </BrowserRouter>
));
