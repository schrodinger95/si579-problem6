import './App.css';
// We import this component to make it available.
import { useState } from "react";
import SavedWords from "./components/SavedWords";
import OutputDescription from "./components/OutputDescription";
import WordsOutput from "./components/WordsOutput";
import ShowRhymesButton from "./components/ShowRhymesButton";
import ShowSynonymsButton from "./components/ShowSynonymsButton";
import WordInput from "./components/WordInput";
// To get assets from a file with multiple exports.
// import { helperImage, helperLink} from "./file-with-many-assets"

function App() {

    const [savedWords, setSavedWords] = useState([]);
    const [inputWord, setInputWord] = useState('');
    const [clicked, setClicked] = useState(false);
    const [loading, setLoading] = useState(false);
    const [outputDescription, setOutputDescription] = useState('');
    const [outputWords, setOutputWords] = useState({});

    function groupBy(objects, property) {
        // If property is not a function, convert it to a function that accepts one argument (an object) and returns that object's
        // value for property (obj[property])
        if(typeof property !== 'function') {
            const propName = property;
            property = (obj) => obj[propName];
        }

        const groupedObjects = new Map(); // Keys: group names, value: list of items in that group
        for(const object of objects) {
            const groupName = property(object);
            //Make sure that the group exists
            if(!groupedObjects.has(groupName)) {
                groupedObjects.set(groupName, []);
            }
            groupedObjects.get(groupName).push(object);
        }

        // Create an object with the results. Sort the keys so that they are in a sensible "order"
        const result = {};
        for(const key of Array.from(groupedObjects.keys()).sort()) {
            result[key] = groupedObjects.get(key);
        }
        return result;
    }

    function datamuseRequest(loading, setLoading, url, callback) {
        setLoading(() => {
            return true;
        });
        console.log(loading);
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                // This invokes the callback that updates the page.
                callback(data);
            }, (err) => {
                console.error(err);
            })
            .then(() => setLoading(() => {
                return false;
            }));
        console.log(loading);
    }

    function getDatamuseRhymeUrl(inputWord) {
        return `https://api.datamuse.com/words?${(new URLSearchParams({'rel_rhy': inputWord})).toString()}`;
    }

    function getDatamuseSimilarToUrl(inputWord) {
        return `https://api.datamuse.com/words?${(new URLSearchParams({'ml': inputWord})).toString()}`;
    }

    function showRhymes(inputWord, setOutputDescription, setOutputWords, loading, setLoading) {
        setOutputDescription(() => 'Words that rhyme with ' + inputWord + ':');
        datamuseRequest(loading, setLoading, getDatamuseRhymeUrl(inputWord), (result) => {
            setOutputWords(() => {
                return groupBy(result, 'numSyllables');
            })
        });
    }

    function showSynonyms(inputWord, setOutputDescription, setOutputWords, loading, setLoading) {
        setOutputDescription(() => 'Words with a similar meaning to ' + inputWord + ':');
        datamuseRequest(loading, setLoading, getDatamuseSimilarToUrl(inputWord), (result) => {
            setOutputWords(() => {
                return {'synonyms': result};
            })
        });
    }

    return (
        <main className="container">
            <a href="https://github.com/schrodinger95/si579-problem6/tree/master">Link to code repo</a>
            <h1 className="row">Rhyme Finder (579 Problem Set 6)</h1>
            <div className="row">
                <div className="col">Saved words:
                    <SavedWords
                        wordList={savedWords}
                    />
                </div>
            </div>
            <div className="row">
                <div className="input-group col">
                    <WordInput
                        setInputWord={setInputWord}
                        setClicked={setClicked}
                        showRhymes={showRhymes}
                        inputWord={inputWord}
                        setOutputDescription={setOutputDescription}
                        setOutputWords={setOutputWords}
                        loading={loading}
                        setLoading={setLoading}
                    />
                    <ShowRhymesButton
                        setClicked={setClicked}
                        showRhymes={showRhymes}
                        inputWord={inputWord}
                        setOutputDescription={setOutputDescription}
                        setOutputWords={setOutputWords}
                        loading={loading}
                        setLoading={setLoading}
                    />
                    <ShowSynonymsButton
                        setClicked={setClicked}
                        showSynonyms={showSynonyms}
                        inputWord={inputWord}
                        setOutputDescription={setOutputDescription}
                        setOutputWords={setOutputWords}
                        loading={loading}
                        setLoading={setLoading}
                    />
                </div>
            </div>
            <div className="row">
                <OutputDescription
                    description={outputDescription}
                />
            </div>
            <div className="output row">
                <WordsOutput
                    syllabelDict={outputWords}
                    clicked={clicked}
                    loading={loading}
                    setSavedWords={setSavedWords}
                />
            </div>
        </main>
    );
}

export default App;
