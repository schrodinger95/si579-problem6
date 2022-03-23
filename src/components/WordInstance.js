import WordSaveButton from "./WordSaveButton";

const WordInstance = (props) => {
    const { word } = props

    return (
        <li>
            { word }
            <WordSaveButton
                {...props}
            />
        </li>
    )
}

export default WordInstance;