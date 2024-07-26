import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import TodoList from './components/TodoList'; // Dışa aktarılan bileşeni doğru şekilde içe aktarın
import EditTodo from './components/EditToDo';
import TodoForm from './components/TodoForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';



const App = () => {
    return ( <
        Router >
        <
        header >
        <
        h1 > ToDo Application < /h1> < /
        header > <
        div >
        <
        Switch >
        <
        Route path = "/"
        exact component = { TodoList }
        /> <
        Route path = "/edit/:id"
        component = { EditTodo }
        /> <
        Route path = "/new"
        component = { TodoForm }
        /> < /
        Switch > <
        /div> < /
        Router >
    );
};

export default App;