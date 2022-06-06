/* eslint-disable no-console */
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
import { PlayCircleOutlined, PauseCircleOutlined } from '@ant-design/icons';

const { Meta } = Card;

const CustomCard = styled(Card)`
  & > div {
    display: flex;
  }
  && {
    width: 22rem;
    margin: 1rem 0;
    height: ${(props) => (props.height ? props.height : 10)}rem;
    background-color: ${colors.trackCardColor};
  }
`;

const Text = styled(Meta)`
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
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
  border: none !important;
`;

const CustomPlay = styled(PlayCircleOutlined)`
  font-size: 2rem !important;
  cursor: pointer;
`;
const CustomPause = styled(PauseCircleOutlined)`
  font-size: 2rem !important;
  cursor: pointer;
`;

function TrackCard({ track, handleOnClick }) {
  const { trackName, artistName, artworkUrl100, previewUrl, trackId } = track;

  const audioElement = useRef();
  const [play, setPlay] = useState(false);

  const handleAudio = (event, url) => {
    event.preventDefault();

    const isPaused = audioElement.current.paused;
    console.log(isPaused);
    if (isPaused) {
      audioElement.current.src = url;
      audioElement.current.play();
    } else {
      audioElement.current.pause();
    }
    setPlay(!play);
    if (handleOnClick) {
      handleOnClick(audioElement);
    }
  };

  return (
    <Link to={`/track/${trackId}`}>
      <CustomCard data-testid="track-card">
        <Image src={artworkUrl100} />
        <Wrapper>
          <Text title={trackName} description={artistName} />
          <CustomButton
            shape="circle"
            onClick={(e) => handleAudio(e, previewUrl)}
            icon={
              <If condition={!audioElement.current?.paused && audioElement.current?.src} otherwise={<CustomPlay />}>
                <CustomPause />
              </If>
            }
          />
        </Wrapper>
        <audio ref={audioElement}></audio>
      </CustomCard>
    </Link>
  );
}

TrackCard.propTypes = {
  handleOnClick: PropTypes.func,
  track: PropTypes.shape({
    trackName: PropTypes.string,
    artistName: PropTypes.string,
    artworkUrl100: PropTypes.string,
    previewUrl: PropTypes.string,
    trackId: PropTypes.number
  })
};

export default TrackCard;
