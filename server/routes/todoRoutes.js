const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

// Get all todos
router.get('/', async(req, res) => {
    try {
        const todos = await Todo.find();
        res.json(todos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create a new todo
router.post('/', async(req, res) => {
    const { title, description, completed } = req.body;

    if (!title) {
        return res.status(400).json({ message: 'Title is required' });
    }

    const todo = new Todo({
        title,
        description,
        completed
    });

    try {
        const newTodo = await todo.save();
        res.status(201).json(newTodo);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update a todo by ID
router.put('/:id', async(req, res) => {
    const { title, description, completed } = req.body;

    try {
        const todo = await Todo.findByIdAndUpdate(
            req.params.id, { title, description, completed }, { new: true, runValidators: true }
        );

        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }

        res.json(todo);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Mark todo as completed
router.patch('/:id/complete', async(req, res) => {
    try {
        const todo = await Todo.findByIdAndUpdate(
            req.params.id, { completed: true }, { new: true }
        );
        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        res.json(todo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Soft delete a todo
router.patch('/:id/delete', async(req, res) => {
    try {
        const todo = await Todo.findByIdAndUpdate(
            req.params.id, { deleted: true }, { new: true }
        );
        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        res.json(todo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Restore a todo (undo soft delete)
router.patch('/:id/restore', async(req, res) => {
    try {
        const todo = await Todo.findByIdAndUpdate(
            req.params.id, { deleted: false, completed: false }, // Update both fields
            { new: true }
        );
        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        res.json(todo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Permanently delete a todo
router.delete('/:id/permanent-delete', async(req, res) => {
    try {
        const todo = await Todo.findByIdAndDelete(req.params.id);
        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        res.json({ message: 'Todo permanently deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;