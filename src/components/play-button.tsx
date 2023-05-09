import PlayArrowIcon from '../icons/play-arrow-icon'

const PlayButton = (props) => {
    const { onClick } = props
    return (
        <button style={{}} onClick={onClick}>
            <PlayArrowIcon />
        </button>
    )
}

export default PlayButton
