/**
 *
 * Stories for TrackDetails
 *
 * @see https://github.com/storybookjs/storybook
 *
 */

import React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';
import TrackDetails from '../index';

storiesOf('TrackDetails').add('simple', () => <TrackDetails id={text('id', 'TrackDetails')} />);
