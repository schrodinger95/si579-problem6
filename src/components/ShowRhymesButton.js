const ShowRhymesButton = (props) => {
    const {setClicked, showRhymes, inputWord, setOutputDescription, setOutputWords, loading, setLoading} = props;

    const rhymeButtonHandler = () => {
        setClicked(() => {
            return true;
        })
        showRhymes(inputWord, setOutputDescription, setOutputWords, loading, setLoading);
    }

    return (
        <button
            id="show_rhymes"
            type="button"
            className="btn btn-primary"
            onClick={rhymeButtonHandler}
        >
            Show rhyming words
        </button>)
}

export default ShowRhymesButton;