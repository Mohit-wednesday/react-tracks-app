/**
 *
 * TrackCard
 *
 */

import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Card, Button } from 'antd';
import { colors } from '@themes';
import If from '@components/If';
import T from '@app/components/T';
import { PlayCircleOutlined, PauseCircleOutlined } from '@ant-design/icons';

const CustomCard = styled(Card)`
  & > div {
    display: flex;
  }
  && {
    width: 22rem;
    margin: 1rem 0;
    height: ${(props) => (props.height ? props.height : 10)}rem;
    background-color: ${colors.trackCardColor};
    &:hover {
      box-shadow: ${(props) => props.shadow};
    }
  }
`;

const Text = styled(T)`
  && {
    margin: 0.3rem;
    width: 15em;
  }
`;

const Wrapper = styled.div`
  && {
    padding: 0 1em;
  }
`;

const Image = styled.img`
  && {
    width: 5rem;
    height: ${(props) => (props.height ? props.height : 6)}rem;
  }
`;
const CustomButton = styled(Button)`
  && {
    border: none;
    background: transparent;
    box-sizing: content-box;
    &:hover {
      background: transparent;
    }
  }
`;

const StyledAudio = styled.audio`
  && {
    visibility: hidden;
  }
`;

function TrackCard({ trackName, artistName, artworkUrl100, previewUrl, trackId, handleOnClick }) {
  const audioElement = useRef();
  const [playing, setPlaying] = useState(false);

  function onPause() {
    setPlaying((val) => !val);
    if (audioElement?.current?.ended) {
      handleOnClick(audioElement);
    }
  }

  function onPlayPause(e) {
    e.preventDefault();
    if (!playing) {
      audioElement?.current?.play();
      setPlaying((val) => !val);
    } else {
      audioElement?.current?.pause();
    }
    handleOnClick(audioElement);
  }

  return (
    <Link to={`/track/${trackId}`}>
      <CustomCard data-testid="track-card" shadow={`0 0 10px 1px ${colors.shadowColor}`}>
        <Image src={artworkUrl100} />
        <Wrapper>
          <If
            condition={trackName}
            otherwise={<Text data-testid="track_name_unavailable" id="track_name_unavailable" />}
          >
            <Text title={trackName} text={trackName} data-testid="track-name" />
          </If>
          <If
            condition={artistName}
            otherwise={<Text data-testid="artist_name_unavailable" id="artist_name_unavailable" />}
          >
            <Text title={artistName} text={artistName} data-testid="artist-name" />
          </If>
          <CustomButton
            data-testid="track-control-button"
            onClick={(e) => onPlayPause(e)}
            icon={
              <If condition={playing} otherwise={<PlayCircleOutlined style={{ fontSize: '2rem' }} />}>
                <PauseCircleOutlined style={{ fontSize: '2rem' }} />
              </If>
            }
          />
        </Wrapper>
        <StyledAudio src={previewUrl} ref={audioElement} data-testid="audio" onPause={onPause} />
      </CustomCard>
    </Link>
  );
}

TrackCard.propTypes = {
  handleOnClick: PropTypes.func,
  trackName: PropTypes.string,
  artistName: PropTypes.string,
  artworkUrl100: PropTypes.string,
  previewUrl: PropTypes.string,
  trackId: PropTypes.number
};

export default TrackCard;
