import './App.css';
import {useEffect, useState} from "react";
import {top100Films} from "./utils/constants";
import Select from "./components/Select/Select";

function App() {

  const [allSearchResults, setAllSearchResults] = useState([]);

  useEffect(() => {
    setAllSearchResults(top100Films);
  }, []);

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
