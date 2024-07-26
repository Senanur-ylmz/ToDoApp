import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditTodo = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [todo, setTodo] = useState({
        title: '',
        description: '',
        completed: false,
    });

    useEffect(() => {
        const fetchTodo = async () => {
            try {
                const response = await axios.get(`/api/todos/${id}`);
                setTodo(response.data);
            } catch (error) {
                console.error('Error fetching todo:', error);
            }
        };
        fetchTodo();
    }, [id]);

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
            await axios.put(`/api/todos/${id}`, todo);
            navigate('/');
        } catch (error) {
            console.error('Error updating todo:', error);
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
            />
            <textarea
                name="description"
                value={todo.description}
                onChange={handleChange}
                placeholder="Description"
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
            <button type="submit">Update Todo</button>
        </form>
    );
};

export default EditTodo;
