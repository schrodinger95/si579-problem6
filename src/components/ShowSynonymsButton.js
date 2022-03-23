const ShowSynonymsButton = (props) => {
    const { setClicked, showSynonyms, inputWord, setOutputDescription, setOutputWords, loading, setLoading } = props;

    const synonymButtonHandler = () => {
        setClicked(() => {
            return true;
        })
        showSynonyms(inputWord, setOutputDescription, setOutputWords, loading, setLoading);
    }

    return (
        <button
            id="show_synonyms"
            type="button"
            className="btn btn-secondary"
            onClick={synonymButtonHandler}
        >
            Show synonyms
        </button>)
}

export default ShowSynonymsButton;