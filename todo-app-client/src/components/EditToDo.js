import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditTodo = ({ match, history }) => {
    const [todo, setTodo] = useState({
        title: '',
        description: '',
        completed: false,
    });

    useEffect(() => {
        const fetchTodo = async() => {
            const response = await axios.get(`/api/todos/${match.params.id}`);
            setTodo(response.data);
        };
        fetchTodo();
    }, [match.params.id]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setTodo((prevTodo) => ({
            ...prevTodo,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        await axios.put(`/api/todos/${match.params.id}`, todo);
        history.push('/');
    };

    return ( <
        form onSubmit = { handleSubmit } >
        <
        input type = "text"
        name = "title"
        value = { todo.title }
        onChange = { handleChange }
        placeholder = "Title" /
        >
        <
        textarea name = "description"
        value = { todo.description }
        onChange = { handleChange }
        placeholder = "Description" /
        >
        <
        label >
        Completed <
        input type = "checkbox"
        name = "completed"
        checked = { todo.completed }
        onChange = { handleChange }
        /> <
        /label> <
        button type = "submit" > Update Todo < /button> <
        /form>
    );
};

export default EditTodo;