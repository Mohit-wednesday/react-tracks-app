/**
 *
 * TracksGrid
 *
 */

import { get, isEmpty } from 'lodash';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import If from '@app/components/If';
import T from '@app/components/T';
import { colors } from '@themes';
import { For } from '@app/components/For';
import TrackCard from '@app/components/TrackCard/index';
import { Skeleton } from 'antd';

const CustomizedT = styled(T)`
  && {
    margin-top: 0.5rem;
    color: ${colors.trackCardColor};
  }
`;

const StyledGrid = styled.div`
  && {
    display: grid;
    grid-template-columns: 1fr;
    @media screen and (min-width: 790px) {
      grid-template-columns: 1fr 1fr;
    }
    @media screen and (min-width: 1000px) {
      grid-template-columns: 1fr 1fr 1fr;
    }
    gap: 1rem;
  }
`;

function TracksGrid({ itunesData, artistName, loading }) {
  const [track, setTrack] = useState(null);

  const tracks = get(itunesData, 'results', []);
  const resultCount = get(itunesData, 'resultCount', 0);

  const handleOnClick = (ref) => {
    setTrack(ref);
    const isPaused = track?.current?.paused;
    if (!isPaused && ref?.current.src !== track?.current?.src) {
      track?.current?.pause();
    }
  };
  return (
    <div data-testid="tracks-grid">
      {(tracks.length !== 0 || loading) && (
        <Skeleton loading={loading} active>
          <If condition={!isEmpty(artistName)}>
            <div>
              <CustomizedT id="search_query" values={{ artistName }} data-testid="itunes-artist-name" />
            </div>
          </If>
          <If condition={resultCount !== 0}>
            <div>
              <CustomizedT id="matching_tracks" values={{ resultCount }} />
            </div>
          </If>
          <For
            of={tracks}
            ParentComponent={StyledGrid}
            renderItem={(item, index) => <TrackCard key={item.artistId} handleOnClick={handleOnClick} {...item} />}
          />
        </Skeleton>
      )}
    </div>
  );
}

TracksGrid.propTypes = {
  itunesData: PropTypes.shape({
    resultCount: PropTypes.number,
    results: PropTypes.array
  }),
  artistName: PropTypes.string,
  loading: PropTypes.bool
};

export default TracksGrid;
