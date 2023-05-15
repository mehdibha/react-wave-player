// Button.stories.ts|tsx

import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { IconButton, ThemeProvider, createTheme } from '@mui/material';
import WavePlayer from './wave-player';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';

const meta: Meta<typeof WavePlayer> = {
  title: 'WavePlayer',
  component: WavePlayer,
};
export default meta;

type Story = StoryObj<typeof WavePlayer>;

/*
 * Example Button story with React Hooks.
 * See note below related to this example.
 */
const MuiWrapper = ({ children }) => {
  const theme = createTheme();

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export const UsingMUI: Story = {
  render: () => (
    <MuiWrapper>
      <WavePlayer
        src={'/sample.mp3'}
        playPauseButton={(props) => (
          <IconButton onClick={props.onClick}>{props.playing ? <PauseIcon /> : <PlayArrowIcon />}</IconButton>
        )}
      />
    </MuiWrapper>
  ),
};
