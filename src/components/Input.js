import React, {useEffect} from 'react';
import Autocomplete from './Autocomplete';
import '../css/Input.css'

function inputReducer( state, action ) {
  switch ( action.type ) {
      case 'setInitialState':
          return {
              usersChoice: '',
              listOfUsers: action.apiAnswer,
              listOfUsersFiltered: ''
          }
      case 'getUsersValue':
          return {
            ...state,
            listOfUsersFiltered: action.filteredAnswer
          }
      case 'setSelectedUser':
          return {
            ...state,
            usersChoice: action.choice,
          }                          
      default:
        return    
  }
}

const Input = () => {

const [inputState, dispatch] = React.useReducer( inputReducer, {usersChoice: '', suggestions: '', listOfUsersFiltered: '' } );

useEffect(() => {
  const fetchData = async () => {
      let answer  = await fetch('https://jsonplaceholder.typicode.com/users')
      let answerJson = await answer.json();
      dispatch({type: 'setInitialState', apiAnswer: answerJson})
  };
  fetchData();
}, []);

const filterUsers = ( inputData ) => {
  dispatch({type: 'setSelectedUser', choice: inputData})

  if ( inputData ) {
    const data = inputState.listOfUsers;
    let users = data.filter(function( rawDataElement ) {
      return rawDataElement.name.includes(inputData) === true
    })
    dispatch({type: 'getUsersValue', filteredAnswer: users})  
  } else {
    dispatch({type: 'getUsersValue', filteredAnswer: ''})  
  }
}

  return (
    <div className="App">
          <div>
            <input className="inputBorder" value={inputState.usersChoice} onChange={(e) => filterUsers( e.target.value )} type="text"/>
            <Autocomplete dispatch={dispatch} data={inputState.listOfUsersFiltered}/>
          </div>
    </div>
  );
}

export default Input;