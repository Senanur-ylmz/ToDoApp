import React, { useState } from 'react';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const App = () => {
    const [selectedTodo, setSelectedTodo] = useState(null);

    const handleEdit = (todo) => {
        setSelectedTodo(todo);
    };

    const handleSave = () => {
        setSelectedTodo(null);
    };

    const handleCancel = () => {
        setSelectedTodo(null);
    };

    return ( <
        Router >
        <
        div className = "App" >
        <
        Switch >
        <
        Route path = "/"
        exact >
        <
        TodoList onEdit = { handleEdit }
        /> <
        TodoForm selectedTodo = { selectedTodo }
        onSave = { handleSave }
        onCancel = { handleCancel }
        /> <
        /Route> <
        /Switch> <
        /div> <
        /Router>
    );
};

export default App;