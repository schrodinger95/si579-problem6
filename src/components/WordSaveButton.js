import './WordSaveButton.css';

const WordSaveButton = (props) => {
    const { setSavedWords, word } = props;

    const saveButtonHandler = () => {
        setSavedWords((previousList) => {
            if (!previousList.includes(word)) {
                return [...previousList, word];
            }
            else {
                return previousList;
            }
        });
    };

    return (
        <button onClick={saveButtonHandler} className='save-button'>
            (Save)
        </button>
    );
}

export default WordSaveButton;