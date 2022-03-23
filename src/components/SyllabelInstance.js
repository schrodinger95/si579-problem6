import WordInstance from "./WordInstance";

const SyllabelInstance = (props) => {
    const { wordDict, setSavedWords } = props;

    const generateWords = () => {
        const wordsToShow = []
        for (const [index, wordInstance] of Object.entries(wordDict)) {
            wordsToShow.push(
                <WordInstance
                    key={index}
                    word={wordInstance.word}
                    setSavedWords={setSavedWords}
                />
            )
        }

        return wordsToShow;
    }

    return (
        <>
            {generateWords()}
        </>
    );
}

export default SyllabelInstance;