const WordInput = (props) => {
    const { setInputWord, setClicked, showRhymes, inputWord, setOutputDescription, setOutputWords, loading, setLoading } = props;

    const inputWordChangeHandler = (e) => {
        setInputWord(() => {
            return e.target.value;
        });
    };

    const inputWordKeyPressHandler = (e) => {
        if (e.key === 'Enter') {
            setClicked(() => {
                return true;
            })
            showRhymes(inputWord, setOutputDescription, setOutputWords, loading, setLoading);
        }
    }

    return (
        <input
            onChange={inputWordChangeHandler}
            onKeyPress={inputWordKeyPressHandler}
            className="form-control"
            type="text"
            placeholder="Enter a word"
            id="word_input"
        />)
}

export default WordInput;