const ToDo = require('./model');


const getToDo = (req, res) => {
  const query = ToDo.find();

  executeQuery(query)
    .then(data => sendSuccessMessage(res, data))
    .catch(err => sendFailureMessage(res, err.stack));
};

const addToDo = (req, res) => {
  const { todo } = req.body;
  const toDoObj = new ToDo({ todo });
  if (todo) {
    toDoObj.save((err) => {
      if (err) {
        sendFailureMessage(res, err.stack);
      } else {
        getToDo(req, res);
      }
    });
  } else {
    sendFailureMessage(res, 'todo cannot be empty');
  }
};

const updateToDo = (req, res) => {
  const { id } = req.params;
  const { todo } = req.body;

  if (id && todo) {
    const query = ToDo.updateOne({ _id: id }, { todo });
    executeQuery(query)
      .then(() => getToDo(req,res))
      .catch(err => sendFailureMessage(res, err.stack))
  } else {
    sendFailureMessage(res, 'id/todo cannot be empty');
  }
};

const deleteToDo = (req, res) => {
  const { id } = req.params;
  console.log(id);
  const query = ToDo.deleteOne({ _id: id });

  executeQuery(query)
    .then(() => getToDo(req, res))
    .catch(err => sendFailureMessage(res, err.stack));
}

module.exports = {
  getToDo,
  addToDo,
  updateToDo,
  deleteToDo,
};

// Util methods

/**
 * Promisify exec command
 * 
 * @param {DocumentQuery} query 
 */
const executeQuery = (query) => new Promise((res, rej) => {
  query.exec((err, data) => {
    if (err) {
      rej(err);
    }
    console.log(err, data)
    res(data);
  });
});

const sendSuccessMessage = (res, message) => {
  res.status(200).send({ message });
};

const sendFailureMessage = (res, message) => {
  res.status(500).send({ message });
};
