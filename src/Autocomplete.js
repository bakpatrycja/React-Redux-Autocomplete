import React from 'react';

const Autocomplete = (props) => {
let suggestions
let { data , dispatch } = props;
let showing = false;

const setInputValue = (name) => {
  dispatch({type: 'setSelectedUser', choice: name}) 
  dispatch({type: 'getUsersValue', filteredAnswer: ''})  
}

if (Array.isArray(data)) {
  showing = true;
  suggestions = data.map(function(item, index) {
    return ([
        <ul>
          <li key={index}> <button  key={index} onClick={()=>setInputValue(item.name)} > {item.name} </button></li>
        </ul>
    ]);
 });
}

  return (
    <div className="Autocomplete">
      {suggestions}
    </div>
  );
}

export default Autocomplete;