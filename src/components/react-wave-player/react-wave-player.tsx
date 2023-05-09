import React from 'react'
import WaveSurfer from 'wavesurfer.js'
import PlayButton from './play-button'

const ReactWavePlayer = (props) => {
    const { src } = props
    const [playing, setPlaying] = React.useState(false)
    const [ready, setReady] = React.useState(false)
    const wavesurferRef = React.useRef(null)
    const containerRef = React.useRef(null)
    const [audioLoaded, setAudioLoaded] = React.useState(false)

    React.useEffect(() => {
        if (containerRef.current) {
            wavesurferRef.current = WaveSurfer.create({
                container: containerRef.current,
            })
            wavesurferRef.current.on('ready', handlePlayerReady)
            wavesurferRef.current.on('play', handlePlay)
            wavesurferRef.current.on('pause', handlePause)
        }
        return () => {
            if (wavesurferRef.current) {
                wavesurferRef.current.destroy()
            }
        }
    }, [])

    const playPause = () => {
        if (wavesurferRef.current) {
            wavesurferRef.current.playPause()
        }
    }

    const handlePlayerReady = () => {
        console.log('handlePlayerReady')
        setReady(true)
    }

    const handlePlay = () => {
        setPlaying(true)
    }

    const handlePause = () => {
        setPlaying(false)
    }

    React.useEffect(() => {
        if (wavesurferRef.current) {
            if (audioLoaded !== src) {
                wavesurferRef.current.load(src)
                setAudioLoaded(src)
            }
        }
    }, [src, audioLoaded])

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
            }}
        >
            <PlayButton onClick={playPause} playing={playing} />
            <div ref={containerRef} />
            {!ready && 'loading'}
        </div>
    )
}

export default ReactWavePlayer
