const apiUrl = 'http://localhost:5000/todo';

const getToDo = () => fetch(apiUrl).then(response => response.json());

const addToDo = (todo) => {
  return fetch(`${apiUrl}`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({ todo }),
  }).then(response => response.json());
};

const deleteToDo = (id) => {
  return fetch(`${apiUrl}/${id}`, { method: 'DELETE' })
    .then(response => response.json())
};

const updateToDo = (id, todo) => {
  return fetch(`${apiUrl}/${id}`, {
    method: 'PUT',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({ todo })
  }).then(response => response.json());
};

export {
  getToDo,
  addToDo,
  deleteToDo,
  updateToDo
};