const express = require('express');
const router = express.Router();

let todos = [
    {
       id: 1, nama_hewan: "Singa", jumlah: "5", pengurus: "Kurniawan"
    },
    {
        id: 2, nama_hewan: "Jerapah", jumlah_hewan: "10", pengurus: "Heru"
    },
];

router.get('/', (req, res) => {
    res.json(todos);
});

router.post('/', (req, res) => {
    const newTodo = {
        id: todos.length + 1,
        nama_hewan: req.body.nama_hewan,
        jumlah: req.body.jumlah,
        jenis_hewan: req.body.pengurus
    };
    todos.push(newTodo);
    res.status(201).json(newTodo);
});

router.delete('/:id', (req,res)=>{
    const todoIndex = todos.findIndex(t => t.id === parseInt(req.params.id));
    if(todoIndex===-1) return res.status(404).json({message: 'Hewan tidak ditemukan'});

    const deletedTodo = todos.splice(todoIndex, 1)[0];
    res.status(200).json({message: `Hewan'${deletedTodo.task}'Telah dihapus`});
});

router.put('/:id', (req,res)=>{ 
    const todo = todos.find(t => t.id === parseInt(req.params.id));
    if (!todo) return res.status(404).json({message: 'Hewan tidak ditemukan'});
    todo.task = req.body.task || todo.task;

    res.status(200).json({
        message: `Hewan dengan ID ${todo.id} telah diperbarui`,
        updatedTodo:todo
    });
});

module.exports = router;