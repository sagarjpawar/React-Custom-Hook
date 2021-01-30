import React, { useState, useEffect, useRef } from 'react';

import Card from '../UI/Card';
import './Search.css';

const Search = React.memo(({ onLoadSearchText }) => {
  const [searchText, setSearchText] = useState("");
  const inputRef = useRef();
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchText === inputRef.current.value) {
        const query =
          searchText.length === 0
            ? ''
            : `?orderBy="title"&equalTo="${searchText}"`;
        fetch('https://react-hooks-update-220cb.firebaseio.com/ingredient.json' + query)
          .then(response => response.json())
          .then(responseObj => {
            const res = [];
            for (let item in responseObj) {
              res.push({
                id: item,
                title: responseObj[item].title,
                amount: responseObj[item].amount
              })
            }
            onLoadSearchText(res);
          })
      }
      console.log('setTimeout');
    }, 500);
    console.log('timer = ',timer);
    return ()=>{
      console.log('cleaned',timer);
      clearTimeout(timer);
    }
  }, [searchText, onLoadSearchText, inputRef]);
  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input
            ref={inputRef}
            type="text"
            value={searchText}
            onChange={event => setSearchText(event.currentTarget.value)} />
        </div>
      </Card>
    </section>
  );
});

export default Search;
