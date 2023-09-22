import "./Select.css";
import {useEffect, useState} from "react";

export default function Select ({options, placeholder}) {

    const [searchValue, setSearchValue] = useState('');
    const [filteredSearchResults, setFilteredSearchResults] = useState([]);
    const [displayOptions, setDisplayOptions] = useState(false);

    useEffect(() => {
        setFilteredSearchResults(options.filter(result => result.label.match(new RegExp(searchValue, 'gi'))));
    }, [searchValue, options]);

    const onChange = e => {
        setSearchValue(e.target.value);
        console.log('searchValue : ', searchValue);
        setDisplayOptions(true);
    }

    const onClick = () => {
        setDisplayOptions(!displayOptions);
    }

    const onOptionClick = e => {
        console.log(e.target.innerText);
        setSearchValue(e.target.innerText);
        setDisplayOptions(false);
    }

    return (
        <section className="select">
                <input
                    className="select__input"
                    type="text"
                    value={searchValue}
                    placeholder={placeholder}
                    onChange={onChange}
                    onClick={onClick}/>
                <ul className="select__list">
                    {displayOptions && filteredSearchResults.map((item, index) => (
                        <li
                            key={index}
                            className="select__item"
                            onClick={onOptionClick}
                            >
                            {item.label}
                        </li>))}

                </ul>
        </section>
    )
}