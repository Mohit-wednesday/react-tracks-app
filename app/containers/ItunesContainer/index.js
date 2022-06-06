/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/**
 *
 * ItunesContainer
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Input, Skeleton } from 'antd';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { injectSaga } from 'redux-injectors';
import { selectItunesContainer, selectItunesArtistName, selectItunesData, selectItunesError } from './selectors';
import T from '@app/components/T';
import If from '@app/components/If';
import itunesContainerSaga from './saga';
import styled from 'styled-components';
import { get, isEmpty, debounce } from 'lodash';
import { colors } from '@themes';
import { itunesContainerCreators } from './reducer';
import { For } from '@app/components/For';
import TrackCard from '@app/components/TrackCard/index';

const { Search } = Input;

const CustomCard = styled(Card)`
  && {
    margin: 20px 0;
    max-width: ${(props) => props.maxwidth}px;
    color: ${(props) => props.color};
  }
`;

const CustomizedT = styled(T)`
  && {
    color: ${(props) => props.color};
  }
`;

const Container = styled.div`
  && {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: 0 auto;
    padding: ${(props) => props.padding}px;
    max-width: ${(props) => props.maxwidth}px;
  }
`;

const TracksGrid = styled.div`
  && {
    display: grid;
    display: grid;
    grid-template-columns: 1fr;
    /* gap: 1rem; */
    @media screen and (min-width: 790px) {
      grid-template-columns: 1fr 1fr;
    }
    @media screen and (min-width: 1000px) {
      grid-template-columns: 1fr 1fr 1fr;
    }
    gap: 0.25rem;
  }
`;

const BottomContainer = styled.div`
  && {
    display: flex;
    flex-direction: column;
    margin: 10px auto;
    padding: 5px 50px;
    background-color: ${colors.primary};
    border-radius: 10px;
  }
`;

export function ItunesContainer({
  dispatchArtistData,
  dispatchClearArtistData,
  artistName,
  padding,
  maxwidth,
  itunesData,
  itunesError
}) {
  const [loading, setLoading] = useState(false);
  const [track, setTrack] = useState(null);

  useEffect(() => {
    const loaded = get(itunesData, 'results', null) || itunesError;
    if (loading && loaded) {
      setLoading(false);
    }
  }, [itunesData]);

  useEffect(() => {
    if (artistName && !itunesData?.results?.length) {
      dispatchArtistData(artistName);
      setLoading(true);
    }
  }, []);

  const handleOnChange = (name) => {
    if (!isEmpty(name)) {
      dispatchArtistData(name);
      setLoading(true);
    } else {
      dispatchClearArtistData();
    }
  };

  const debouncedHandleOnChange = debounce(handleOnChange, 200);

  const renderTracks = () => {
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
      (tracks.length !== 0 || loading) && (
        <Skeleton loading={loading} active>
          <If condition={artistName}>
            <div>
              <CustomizedT id="search_query" values={{ artistName }} />
            </div>
          </If>
          <If condition={resultCount !== 0}>
            <div>
              <CustomizedT id="matching_tracks" values={{ resultCount }} />
            </div>
          </If>
          <For
            of={tracks}
            ParentComponent={TracksGrid}
            renderItem={(item, index) => <TrackCard key={item.artistId} track={item} handleOnClick={handleOnClick} />}
          />
        </Skeleton>
      )
    );
  };

  return (
    <>
      <Container padding={padding} maxwidth={maxwidth}>
        <CustomCard maxwidth={maxwidth}>
          <T marginBottom={10} id="artist_search" />
          <Search
            defaultValue={artistName}
            type="text"
            onChange={(event) => debouncedHandleOnChange(event.target.value)}
            onSearch={(searchText) => debouncedHandleOnChange(searchText)}
          />
        </CustomCard>
      </Container>
      <BottomContainer>{renderTracks()}</BottomContainer>
    </>
  );
}

ItunesContainer.propTypes = {
  artistName: PropTypes.string,
  padding: PropTypes.number,
  maxwidth: PropTypes.number,
  dispatchArtistData: PropTypes.func,
  dispatchClearArtistData: PropTypes.func,
  itunesError: PropTypes.string,
  itunesData: PropTypes.shape({
    resultCount: PropTypes.number,
    results: PropTypes.array
  })
};

ItunesContainer.defaultProps = {
  maxwidth: 500,
  padding: 20
};

const mapStateToProps = createStructuredSelector({
  itunesContainer: selectItunesContainer(),
  itunesData: selectItunesData(),
  itunesError: selectItunesError(),
  artistName: selectItunesArtistName()
});

function mapDispatchToProps(dispatch) {
  const { requestGetArtist, clearArtistData } = itunesContainerCreators;
  return {
    dispatchArtistData: (artistName) => dispatch(requestGetArtist(artistName)),
    dispatchClearArtistData: () => dispatch(clearArtistData())
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
  injectIntl,
  memo,
  injectSaga({ key: 'itunesContainer', saga: itunesContainerSaga })
)(ItunesContainer);

export const ItunesContainerTest = compose(injectIntl)(ItunesContainer);
