import SyllabelInstance from "./SyllabelInstance";

const WordsOutput = (props) => {
    const { syllabelDict, clicked, loading, setSavedWords } = props;

    const generateSyllabels = () => {
        const syllabelsToShow = [];

        for (const [syllable, wordDict] of Object.entries(syllabelDict)) {
            if (syllable !== 'synonyms') {
                syllabelsToShow.push(
                    <h3
                        key={syllable + ': h3'}
                    >
                        Syllables: { syllable }
                    </h3>
                )
            }

            syllabelsToShow.push(
                <ul key={syllable + ': ul'}>
                    <SyllabelInstance
                        key={syllable}
                        wordDict={wordDict}
                        setSavedWords={setSavedWords}
                    />
                </ul>

            )
        };

        return syllabelsToShow;
    }

    const wordsOutput = () => {
        if (loading === true) {
            return <div id="loading">...loading</div>
        } else if(clicked === false && Object.keys(syllabelDict).length === 0) {
            return '';
        } else if (Object.keys(syllabelDict).length === 0) {
            return '(no results)';
        } else {
            return generateSyllabels();
        }
    }
    return (
        <output id="word_output" className="col">
            { wordsOutput() }
        </output>)
}

export default WordsOutput;