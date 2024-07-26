import React, { useState } from 'react';
import axios from 'axios';

const TodoForm = ({ fetchTodos }) => {
    const [todo, setTodo] = useState({
        title: '',
        description: '',
        completed: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setTodo((prevTodo) => ({
            ...prevTodo,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/todos', todo);
            setTodo({
                title: '',
                description: '',
                completed: false,
            });
            fetchTodos();
        } catch (error) {
            console.error('Error adding todo:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="title"
                value={todo.title}
                onChange={handleChange}
                placeholder="Title"
                required
            />
            <textarea
                name="description"
                value={todo.description}
                onChange={handleChange}
                placeholder="Description"
                required
            />
            <label>
                Completed
                <input
                    type="checkbox"
                    name="completed"
                    checked={todo.completed}
                    onChange={handleChange}
                />
            </label>
            <button type="submit">Add Todo</button>
        </form>
    );
};

export default TodoForm;
