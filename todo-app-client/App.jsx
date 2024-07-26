import React, { useState } from 'react';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

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

    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<TodoList onEdit={handleEdit} />} />
                    <Route
                        path="/new"
                        element={
                            <TodoForm
                                selectedTodo={selectedTodo}
                                onSave={handleSave}
                                onCancel={handleCancel}
                            />
                        }
                    />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
