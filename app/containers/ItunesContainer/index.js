/**
 *
 * ItunesContainer
 *``
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Input } from 'antd';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { injectSaga } from 'redux-injectors';
import { selectItunesContainer, selectItunesArtistName, selectItunesData, selectItunesError } from './selectors';
import T from '@app/components/T';
import itunesContainerSaga from './saga';
import styled from 'styled-components';
import { get, isEmpty, debounce } from 'lodash';
import { colors } from '@themes';
import { itunesContainerCreators } from './reducer';
import TracksGrid from '@app/components/TracksGrid/index';
import If from '@app/components/If';

const { Search } = Input;

const CustomCard = styled(Card)`
  && {
    margin: 20px 0;
    max-width: ${(props) => props.maxwidth}px;
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

const BottomContainer = styled.div`
  && {
    display: flex;
    flex-direction: column;
    align-items: center;
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
  itunesError,
  intl
}) {
  const [loading, setLoading] = useState(false);

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
  const renderErrorState = () => {
    let trackError;
    if (itunesError) {
      trackError = itunesError;
    } else if (!get(itunesData, 'resultCount', 0)) {
      trackError = 'itunes_empty_tracks';
    }
    return (
      <If condition={!isEmpty(trackError)}>
        <CustomCard color={itunesError ? colors.error : colors.sub} maxwidth="500">
          <T id={trackError} data-testid="itunes-error" values={{ artistName }} />
        </CustomCard>
      </If>
    );
  };

  return (
    <>
      <Container padding={padding} maxwidth={maxwidth} data-testid="redirect">
        <CustomCard maxwidth={maxwidth}>
          <T marginBottom={10} id="artist_search" />
          <Search
            data-testid="search-input"
            defaultValue={artistName}
            type="text"
            onChange={(event) => debouncedHandleOnChange(event.target.value)}
            onSearch={(searchText) => debouncedHandleOnChange(searchText)}
          />
        </CustomCard>
      </Container>
      <BottomContainer>
        <TracksGrid itunesData={itunesData} artistName={artistName} loading={loading} />
        {renderErrorState()}
      </BottomContainer>
    </>
  );
}

ItunesContainer.propTypes = {
  artistName: PropTypes.string,
  padding: PropTypes.number,
  maxwidth: PropTypes.number,
  intl: PropTypes.object,
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

export function mapDispatchToProps(dispatch) {
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
