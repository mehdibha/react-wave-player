import React from 'react';
import WaveSurfer from 'wavesurfer.js';
import { WaveSurferParams } from 'wavesurfer.js/types/params';

export interface PlayerProps {
  src: string;
  playPauseButton?: React.ComponentType<{ playing: boolean; onClick: () => void }>;
  loader: () => React.JSX.Element;
  waveOptions?: WaveSurferParams;
  containerStyles: any;
}

const WavePlayer = (props: PlayerProps) => {
  const { src, playPauseButton: PlayPauseButton, loader: Loader, waveOptions, containerStyles } = props;
  const [playing, setPlaying] = React.useState(false);
  const [ready, setReady] = React.useState(false);
  const wavesurferRef = React.useRef<WaveSurfer | null>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [audioLoaded, setAudioLoaded] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (containerRef.current) {
      wavesurferRef.current = WaveSurfer.create({
        ...waveOptions,
        hideScrollbar: true,
        container: containerRef.current,
      });
      wavesurferRef.current.on('ready', handlePlayerReady);
      wavesurferRef.current.on('play', handlePlay);
      wavesurferRef.current.on('pause', handlePause);
    }

    return () => {
      if (wavesurferRef.current) {
        wavesurferRef.current.destroy();
      }
    };
  }, []);

  const playPause = () => {
    if (wavesurferRef.current) {
      wavesurferRef.current.playPause();
    }
  };

  const handlePlayerReady = () => {
    console.log('handlePlayerReady');
    setReady(true);
  };

  const handlePlay = () => {
    setPlaying(true);
  };

  const handlePause = () => {
    setPlaying(false);
  };

  React.useEffect(() => {
    if (wavesurferRef.current) {
      if (audioLoaded !== src) {
        wavesurferRef.current.load(src);
        setAudioLoaded(src);
      }
    }
  }, [src, audioLoaded]);

  return (
    <>
      {!ready && Loader ? <Loader /> : <p>loading...</p>}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          ...containerStyles,
        }}
      >
        {ready ? (
          PlayPauseButton ? (
            <PlayPauseButton playing={playing} onClick={playPause} />
          ) : (
            <button onClick={playPause}>{playing ? 'pause' : 'play'}</button>
          )
        ) : null}
        <div ref={containerRef} style={{ flex: 1 }} />
      </div>
    </>
  );
};

export default WavePlayer;
