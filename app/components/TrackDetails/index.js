/**
 *
 * TrackDetails
 *
 */

import React, { useState, memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { createStructuredSelector } from 'reselect';
import { injectIntl } from 'react-intl';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import { injectSaga } from 'redux-injectors';
import { colors, media } from '@app/themes';
import { itunesContainerCreators } from '@app/containers/ItunesContainer/reducer';
import { selectTrackData, selectTrackError } from '@app/containers/ITunesContainer/selectors';
import { connect } from 'react-redux';
import { compose } from 'redux';
import itunesContainerSaga from '@app/containers/ITunesContainer/saga';
import { isEmpty } from 'lodash';
import { Skeleton, Card, Row, Col, Image, Statistic } from 'antd';
import If from '@app/components/If';
import T from '@app/components/T';
import { dateFormat } from '@app/utils/index';

const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: 2rem auto;
  max-width: ${(props) => props.maxwidth}px;
  padding: ${(props) => props.padding}rem;
`;

const StyledImage = styled(Image)`
  && {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
`;

const StyledImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  flex: 0.4;
`;

const TrackContent = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  gap: 1rem;
  align-items: center;
  ${media.lessThan('tablet')`
    flex-direction: column !important;
  `}
`;

const TrackInfo = styled.div`
  flex: 0.6;
`;

const TrackName = styled(T)`
  && {
    font-size: 1.6rem;
    margin-bottom: 0.5rem;
    font-weight: 700;
    color: ${colors.primary};
  }
`;
const ArtistName = styled(T)`
  && {
    margin-top: 0rem;
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 0.6rem;
    opacity: 0.5;
  }
`;

const ReleaseDate = styled(T)`
  && {
    margin-bottom: 0.2rem;
    font-weight: bold;
    color: ${colors.subText};
    width: 100%;
  }
`;

const CollectionName = styled(T)`
  && {
    margin: 0.5rem 0;
  }
`;

const Genre = styled(T)`
  && {
    margin: 0.5rem 0;
    max-width: fit-content;
    padding: 0.1rem 0.5rem;
    border-radius: 99px;
    color: ${colors.trackCardColor};
    background-color: ${colors.primary};
  }
`;

const StyledAudio = styled.audio`
  && {
    margin: 0.5rem 0 0 0;
  }
`;

const valueStyle = { fontSize: '1.2rem', color: colors.subText };

function TrackDetails({ dispatchGetTrackDetails, track, trackError, maxwidth, padding }) {
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const {
    artworkUrl100,
    artistName,
    collectionName,
    primaryGenreName,
    trackName,
    trackPrice,
    previewUrl,
    releaseDate,
    trackTimeMillis,
    country
  } = track;

  useEffect(() => {
    if (!isEmpty(track) || !isEmpty(trackError)) {
      setLoading(false);
    }
    let loadingTimerId = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => {
      clearTimeout(loadingTimerId);
    };
  }, [track, trackError]);

  useEffect(() => {
    if (dispatchGetTrackDetails) {
      dispatchGetTrackDetails(params.trackId);
    }
  }, [params.trackId]);

  return (
    <StyledContainer data-testid="track-details" maxwidth={maxwidth} padding={padding}>
      <Helmet>
        <title>
          {track?.trackName
            ? `${track?.trackName}${track?.artistName && ` by ${track?.artistName}`}`
            : 'TrackContainer'}
        </title>
        <meta name="description" content={track?.trackName ?? 'Description of TrackContainer'} />
      </Helmet>
      <Skeleton loading={loading} active data-testid="skeleton-loader">
        <Card>
          <TrackContent>
            <StyledImageContainer>
              <StyledImage
                width="95%"
                height="95%"
                src={artworkUrl100 ?? ''}
                fallback="https://media.istockphoto.com/vectors/thumbnail-image-vector-graphic-vector-id1147544807?k=20&m=1147544807&s=612x612&w=0&h=pBhz1dkwsCMq37Udtp9sfxbjaMl27JUapoyYpQm0anc="
              ></StyledImage>
            </StyledImageContainer>
            <TrackInfo>
              <If
                condition={trackName}
                otherwise={<TrackName id="track_name_unavailable" data-testid="track-name-unavailable" />}
              >
                <TrackName title={trackName} text={trackName} data-testid="track-name" />
              </If>
              <If
                condition={artistName}
                otherwise={<ArtistName data-testid="artist_name_unavailable" id="artist_name_unavailable" />}
              >
                <ArtistName title={artistName} text={artistName} data-testid="track-artist" />
              </If>
              <If
                condition={releaseDate}
                otherwise={<ReleaseDate data-testid="release_date_unavailable" id="release_date_unavailable" />}
              >
                <ReleaseDate
                  title={releaseDate}
                  text={`Release Date: ${dateFormat(releaseDate)}`}
                  data-testid="track-release"
                />
              </If>
              <If
                condition={collectionName}
                otherwise={
                  <CollectionName data-testid="collection_name_unavailable" id="collection_name_unavailable" />
                }
              >
                <CollectionName title={collectionName} text={collectionName} data-testid="track-collection-name" />
              </If>
              <If
                condition={primaryGenreName}
                otherwise={<Genre data-testid="genre_unavailable" id="genre_unavailable" />}
              >
                <Genre title={primaryGenreName} text={primaryGenreName} data-testid="track-genre" />
              </If>
              <Row>
                <Col span={8}>
                  <Statistic
                    data-testid="track-price"
                    suffix="$"
                    precision={2}
                    title="Track Price"
                    value={trackPrice}
                    valueStyle={valueStyle}
                  />
                </Col>
                <Col span={8}>
                  <Statistic
                    data-testid="track-time"
                    precision={2}
                    suffix=" s"
                    title="Track Time"
                    value={trackTimeMillis / 1000}
                    valueStyle={valueStyle}
                  />
                </Col>
                <Col span={8}>
                  <Statistic
                    data-testid="track-country"
                    precision={2}
                    title="Country"
                    value={country}
                    valueStyle={valueStyle}
                  />
                </Col>
              </Row>
              <If
                condition={previewUrl}
                otherwise={<T data-testid="track_preview_unavailable" id="track_preview_unavailable" />}
              >
                <StyledAudio loading="lazy" preload="none" src={previewUrl} controls />
              </If>
            </TrackInfo>
          </TrackContent>
        </Card>
      </Skeleton>
    </StyledContainer>
  );
}

TrackDetails.defaultProps = {
  maxwidth: 800,
  padding: 1
};

TrackDetails.propTypes = {
  dispatchGetTrackDetails: PropTypes.func,
  track: PropTypes.object,
  trackError: PropTypes.any,
  maxwidth: PropTypes.number,
  padding: PropTypes.number
};

export function mapDispatchToProps(dispatch) {
  const { requestGetTrackDetails } = itunesContainerCreators;
  return {
    dispatchGetTrackDetails: (trackId) => dispatch(requestGetTrackDetails(trackId))
  };
}
const mapStateToProps = createStructuredSelector({
  track: selectTrackData(),
  trackError: selectTrackError()
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
  memo,
  injectSaga({ key: 'itunesContainer', saga: itunesContainerSaga })
)(TrackDetails);

export const TrackContainerTest = compose(injectIntl)(TrackDetails);
