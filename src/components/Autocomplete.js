import React from 'react';
import '../css/Autocomplete.css'

const Autocomplete = (props) => {
let suggestions
let { data , dispatch } = props;

const setInputValue = (name) => {
  dispatch({type: 'setSelectedUser', choice: name}) 
  dispatch({type: 'getUsersValue', filteredAnswer: ''})  
}

if (Array.isArray(data)) {
  suggestions = data.map(function(item, index) {
    return ([
          <li key={index} onClick={()=>setInputValue(item.name)}> {item.name}</li>
    ]);
 });
}

  return (
    <div className="Autocomplete">
       <ul className="searchlist--wrapper">
        {suggestions}
       </ul>
    </div>
  );
}

export default Autocomplete;