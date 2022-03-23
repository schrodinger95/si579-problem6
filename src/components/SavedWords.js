const SavedWords = (props) => {
    const { wordList } = props

    const savedWordsOutput = () => {
        if (wordList.length === 0) {
            return '(none)';
        } else {
            return wordList.join(', ')
        }
    }

    return (
        <span id="saved_words">
            {savedWordsOutput()}
        </span>)
}

export default SavedWords;