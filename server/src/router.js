const Router = require('express').Router;
const { getToDo, addToDo, updateToDo, deleteToDo } = require('./controller');

const router = Router();

router.get('/', getToDo);

router.post('/', addToDo);

router.put('/:id', updateToDo);

router.delete('/:id', deleteToDo);

module.exports = router;

