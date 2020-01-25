import React, { useState, useRef, useEffect } from 'react'
import { getToDo, deleteToDo, addToDo, updateToDo } from '../util';
import './ToDo.css'

const ToDoItem = (props) => {
  const inputEl = useRef(null);

  const update = () => {
    const toDoInput = inputEl.current.value;
    props.onUpdate(props.todoId, toDoInput);
  };

  return (
    <li>
      <input defaultValue={props.todo} ref={inputEl} key={props.todoId}/>
      <button onClick={update} >Update</button>
      <button onClick={() => props.onDelete(props.todoId)}>Delete</button>
    </li>
  )
};

const ToDo = () => {
  const [toDoList, setToDoList] = useState([]);
  const [status, setStatus] = useState('');

  useEffect(() => {
    getToDo().then((json) => setToDoList(json.message));
  }, []);

  const setApiStatus = apiStatus => {
    setStatus(apiStatus);
    setTimeout(() => setStatus(''), 2000);
  }

  const setToData = response => {
    setToDoList(response.message);
    setApiStatus('Success')
  };

  const add = (event) => {
    event.preventDefault();
    const toDoInput = event.target.elements[0];
    const toDo = toDoInput.value;

    if (toDo && toDo !== undefined) {
      addToDo(toDo).then(setToData).catch(err => setApiStatus(`Error : ${err}`));
    }
  }

  const del = (id) => {
    deleteToDo(id).then(setToData).catch(err => setApiStatus(`Error : ${err}`));;
  }

  const update = (id, todo) => {
    updateToDo(id, todo).then(setToData).catch(err => setApiStatus(`Error : ${err}`));;
  }

  return (
    <div>
      <p>Simple ToDo</p>
      <form onSubmit={add}>
        <input placeholder="Add task" />
        <button type="submit">Add</button>
      </form>
      <ul style={{listStyle:'none'}}>
        {toDoList.map((toDoObj, index) => <ToDoItem
          todo={toDoObj.todo}
          key={index}
          todoId={toDoObj._id}
          onDelete={del}
          onUpdate={update} />)}
      </ul>
      <div>
        <span>
          {status}
        </span>
      </div>
    </div>
  )
}



export default ToDo;
