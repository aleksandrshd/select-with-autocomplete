import './App.css';
import {useEffect, useState} from "react";
import {getSearchResults} from "./utils/utils";
import Select from "./components/Select/Select";

function App() {

  const [allSearchResults, setAllSearchResults] = useState([]);

  useEffect(() => {
    const setSearchResults = async () => {
      const searchResultsResponse = await getSearchResults();
      console.log(searchResultsResponse);
      setAllSearchResults(searchResultsResponse);
    }
    setSearchResults();
  });

  return (
    <div className="App">

      <Select
          options={allSearchResults}
          placeholder="Movie"
      />

    </div>
  );
}

export default App;
