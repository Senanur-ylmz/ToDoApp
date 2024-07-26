import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TodoList from './components/TodoList';
import EditTodo from './components/EditToDo';
import TodoForm from './components/TodoForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './App.css'; // CSS dosyanızı içe aktarın

const App = () => {
    return (
        <Router>
            <header className="App-header">
                <h1>ToDo Application</h1>
            </header>
            <div className="App">
                <Routes>
                    <Route path="/" element={<TodoList />} />
                    <Route path="/edit/:id" element={<EditTodo />} />
                    <Route path="/new" element={<TodoForm />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
