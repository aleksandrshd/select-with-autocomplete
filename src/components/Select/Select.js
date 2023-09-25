import "./Select.css";
import {useEffect, useRef, useState} from "react";

export default function Select({options, placeholder}) {

  const [inputValue, setInputValue] = useState('');
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [displayOptions, setDisplayOptions] = useState(false);
  const [focusedOption, setFocusedOption] = useState(0);

  const optionsRef = useRef([]);

  useEffect(() => {
    setFilteredOptions(options.filter(result => result.label.match(new RegExp(inputValue, 'gi'))));
  }, [inputValue, options]);

  useEffect(() => {
    console.log('optionsRef.current', optionsRef.current[focusedOption]);
    if (optionsRef.current[focusedOption] !== undefined) {
      optionsRef.current[focusedOption].focus();
      console.log(`Focus set on el ${focusedOption}`);
    }
  }, [focusedOption])

  const onChange = e => {
    setInputValue(e.target.value);
  }

  const onFocus = () => {
    setDisplayOptions(true);
  }

  const onBlur = () => {
    setDisplayOptions(false);
  }

  const onKeyDown = e => {

    if (e.keyCode === 38) {
      setFocusedOption(focusedOption - 1);
    }

    if (e.keyCode === 40) {
      setFocusedOption(focusedOption + 1);
    }

    if (e.keyCode === 13) {
      setInputValue(filteredOptions[focusedOption].label);
      setDisplayOptions(false);
    }

  }

  const onOptionFocus = e => {
    const currentFocusedOption = +e.target.attributes.indexkey.value;
    setFocusedOption(currentFocusedOption);
  }

  const onOptionClick = e => {
    console.log(e.target.innerText);
    setInputValue(e.target.innerText);
    setDisplayOptions(false);
  }

  const onCloseBtnClick = () => {
    setInputValue('');
    setDisplayOptions(false);
  }

  return (
    <section className="select">
      <div
        className="select__container"
        /*onBlur={onBlur}*/
      >
        <div className="select__container-input">
          <input
            className="select__input"
            type="text"
            value={inputValue}
            placeholder={placeholder}
            onChange={onChange}
            onFocus={onFocus}
            /*onBlur={onBlur}*/
            onKeyDown={onKeyDown}/>
          <span
            className="select__close-btn"
            onClick={onCloseBtnClick}
          />
        </div>
        <ul className="select__list">
          {displayOptions && filteredOptions.map((item, index) => (
            <li
              key={index}
              indexkey={index}
              /*tabIndex="-1"*/
              className="select__item"
              ref={el => optionsRef.current[index] = el}
              onClick={onOptionClick}
              onMouseOver={onOptionFocus}
            >
              {item.label}
            </li>))}

        </ul>
      </div>
    </section>
  )
}