import axios from 'axios';

const API_URL = 'http://localhost:3000/todos';

export const getTodos = async() => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching todos', error);
        throw error;
    }
};

export const createTodo = async(todo) => {
    try {
        const response = await axios.post(API_URL, todo);
        return response.data;
    } catch (error) {
        console.error('Error creating todo', error);
        throw error;
    }
};

export const updateTodo = async(id, updates) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, updates);
        return response.data;
    } catch (error) {
        console.error('Error updating todo', error);
        throw error;
    }
};

export const deleteTodo = async(id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting todo', error);
        throw error;
    }
};