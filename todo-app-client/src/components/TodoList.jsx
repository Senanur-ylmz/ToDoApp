import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Button,
  Card,
  Container,
  Grid,
  TextField,
  Typography,
  IconButton,
  Box,
  CardContent,
  CardActions,
  Collapse,
  Checkbox,
  Tabs,
  Tab,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon, RestoreFromTrash as RestoreIcon } from '@mui/icons-material';
import { styled } from '@mui/material/styles';


const ContainerStyled = styled(Container)(({ theme }) => ({
  maxWidth: '1200px',
  margin: 'auto',
  padding: theme.spacing(2),
}));

const CardStyled = styled(Card)(({ theme }) => ({
  backgroundColor: '#1e1e1e',
  color: '#ffffff',
  borderRadius: '10px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
  transition: 'transform 0.3s, box-shadow 0.3s',
  '&:hover': {
    boxShadow: '0 0 20px rgba(255, 255, 255, 0.7)', // White neon effect
    transform: 'scale(1.02)',
  },
}));


const SectionStyled = styled(Box)(({ theme, bgcolor, shadowColor }) => ({
  backgroundColor: bgcolor || '#2e2e2e',
  padding: '24px',
  borderRadius: '16px',
  color: '#ffffff',
  boxShadow: `0 0 30px ${shadowColor || 'rgba(0, 150, 255, 0.5)'}`,
  height: 'auto',
  overflowY: 'auto',
  marginBottom: '24px'
}));

const HeadingStyled = styled(Typography)(({ theme }) => ({
  color: '#ffffff',
  fontSize: '28px',
  fontWeight: 'bold',
  marginBottom: '20px',
  textAlign: 'center'
}));

const IconStyled = styled(IconButton)(({ theme }) => ({
  color: '#ffffff',
  '&:hover': {
    color: '#00bcd4',
  }
}));

const DialogStyled = styled(Dialog)(({ theme }) => ({
  '& .MuiPaper-root': {
    backgroundColor: '#1e1e1e',
    color: '#fff',
    borderRadius: '12px',
    padding: theme.spacing(2),
  },
}));

const TextFieldStyled = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-root': {
    color: '#ffffff',
    '& textarea': {
      backgroundColor: '#333',
      borderRadius: '4px',
      boxShadow: '0 0 10px rgba(0, 150, 255, 0.3)',
    },
  },
}));

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);
  const [deletedTodos, setDeletedTodos] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newTodo, setNewTodo] = useState({ title: '', description: '' });
  const [tabIndex, setTabIndex] = useState(0);
  const [editTodo, setEditTodo] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get('http://localhost:3001/todos');
        setTodos(response.data.filter(todo => !todo.completed && !todo.deleted));
        setCompletedTodos(response.data.filter(todo => todo.completed && !todo.deleted));
        setDeletedTodos(response.data.filter(todo => todo.deleted));
      } catch (error) {
        console.error('Error fetching todos', error);
      }
    };

    fetchTodos();
  }, []);

  const handleAddTodo = async () => {
    try {
      await axios.post('http://localhost:3001/todos', newTodo);
      setNewTodo({ title: '', description: '' });
      setShowForm(false);
      const response = await axios.get('http://localhost:3001/todos');
      setTodos(response.data.filter(todo => !todo.completed && !todo.deleted));
      setCompletedTodos(response.data.filter(todo => todo.completed && !todo.deleted));
      setDeletedTodos(response.data.filter(todo => todo.deleted));
    } catch (error) {
      console.error('Error adding todo', error);
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await axios.patch(`http://localhost:3001/todos/${id}/delete`, { deleted: true });
      const response = await axios.get('http://localhost:3001/todos');
      setTodos(response.data.filter(todo => !todo.completed && !todo.deleted));
      setCompletedTodos(response.data.filter(todo => todo.completed && !todo.deleted));
      setDeletedTodos(response.data.filter(todo => todo.deleted));
    } catch (error) {
      console.error('Error deleting todo', error);
    }
  };

  const handleCompleteTodo = async (id) => {
    try {
      await axios.patch(`http://localhost:3001/todos/${id}/complete`, { completed: true });
      const response = await axios.get('http://localhost:3001/todos');
      setTodos(response.data.filter(todo => !todo.completed && !todo.deleted));
      setCompletedTodos(response.data.filter(todo => todo.completed && !todo.deleted));
      setDeletedTodos(response.data.filter(todo => todo.deleted));
    } catch (error) {
      console.error('Error marking todo as completed', error);
    }
  };

  const handleRestoreTodo = async (id) => {
    try {
      await axios.patch(`http://localhost:3001/todos/${id}/restore`, { deleted: false });
      const response = await axios.get('http://localhost:3001/todos');
      setTodos(response.data.filter(todo => !todo.completed && !todo.deleted));
      setCompletedTodos(response.data.filter(todo => todo.completed && !todo.deleted));
      setDeletedTodos(response.data.filter(todo => todo.deleted));
    } catch (error) {
      console.error('Error restoring todo', error);
    }
  };

  const handlePermanentDeleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/todos/${id}/permanent-delete`);
      const response = await axios.get('http://localhost:3001/todos');
      setTodos(response.data.filter(todo => !todo.completed && !todo.deleted));
      setCompletedTodos(response.data.filter(todo => todo.completed && !todo.deleted));
      setDeletedTodos(response.data.filter(todo => todo.deleted));
    } catch (error) {
      console.error('Error permanently deleting todo', error);
    }
  };

  const handleEditClick = (todo) => {
    setEditTodo(todo);
    setEditDialogOpen(true);
  };

  const handleEditChange = (e) => {
    setEditTodo({
      ...editTodo,
      [e.target.name]: e.target.value
    });
  };

  const handleEditSubmit = async () => {
    try {
      await axios.put(`http://localhost:3001/todos/${editTodo._id}`, editTodo);
      setEditDialogOpen(false);
      setEditTodo(null);
      const response = await axios.get('http://localhost:3001/todos');
      setTodos(response.data.filter(todo => !todo.completed && !todo.deleted));
      setCompletedTodos(response.data.filter(todo => todo.completed && !todo.deleted));
      setDeletedTodos(response.data.filter(todo => todo.deleted));
    } catch (error) {
      console.error('Error updating todo', error);
    }
  };

  return (
    <ContainerStyled>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setShowForm(!showForm)}
        sx={{ my: 3, backgroundColor: '#00bcd4', '&:hover': { backgroundColor: '#0097a7' } }}
      >
        Add New Todo
      </Button>

      <Collapse in={showForm}>
        <Box component="form" sx={{ mb: 3 }}>
          <DialogStyled open={showForm} onClose={() => setShowForm(false)}>
            <DialogTitle>Add New Todo</DialogTitle>
            <DialogContent>
              <TextFieldStyled
                label="Title"
                variant="outlined"
                fullWidth
                margin="normal"
                value={newTodo.title}
                onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
              />
              <TextFieldStyled
                label="Description"
                variant="outlined"
                fullWidth
                margin="normal"
                value={newTodo.description}
                onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
                multiline
                rows={4}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setShowForm(false)} color="secondary">
                Cancel
              </Button>
              <Button onClick={handleAddTodo} color="primary">
                Add
              </Button>
            </DialogActions>
          </DialogStyled>
        </Box>
      </Collapse>

      <Tabs value={tabIndex} onChange={(e, newIndex) => setTabIndex(newIndex)} aria-label="todo tabs">
        <Tab label="Todo List" />
        <Tab label="Completed" />
        <Tab label="Trash Bin" />
      </Tabs>

      {tabIndex === 0 && (
        <SectionStyled bgcolor="#1e1e1e" shadowColor="rgba(0, 150, 255, 0.5)">
          <HeadingStyled>Todo List</HeadingStyled>
          <Grid container spacing={2}>
            {todos.map(todo => (
              <Grid item xs={12} md={6} lg={4} key={todo._id}>
                <CardStyled>
                  <CardContent>
                    <Typography variant="h6">{todo.title}</Typography>
                    <Typography variant="body1">{todo.description}</Typography>
                  </CardContent>
                  <CardActions>
                    <IconStyled onClick={() => handleEditClick(todo)}>
                      <EditIcon />
                    </IconStyled>
                    <IconStyled onClick={() => handleCompleteTodo(todo._id)}>
                    <Checkbox
                      checked={todo.completed}
                      onChange={() => handleCompleteTodo(todo._id)}
                      sx={{
                        color: '#ffffff', // Default color (unchecked)
                        '&.Mui-checked': {
                          color: '#ffffff', // Color when checked
                        },
                      }}
                    />
                    </IconStyled>
                    <IconStyled onClick={() => handleDeleteTodo(todo._id)}>
                      <DeleteIcon />
                    </IconStyled>
                  </CardActions>
                </CardStyled>
              </Grid>
            ))}
          </Grid>
        </SectionStyled>
      )}

      {tabIndex === 1 && (
        <SectionStyled bgcolor="#212121" shadowColor="rgba(0, 255, 0, 0.5)">
          <HeadingStyled>Completed Todos</HeadingStyled>
          <Grid container spacing={2}>
            {completedTodos.map(todo => (
              <Grid item xs={12} md={6} lg={4} key={todo._id}>
                <CardStyled>
                  <CardContent>
                    <Typography variant="h6">{todo.title}</Typography>
                    <Typography variant="body1">{todo.description}</Typography>
                  </CardContent>
                  <CardActions>
                    <IconStyled onClick={() => handleEditClick(todo)}>
                      <EditIcon />
                    </IconStyled>
                    <IconStyled onClick={() => handleRestoreTodo(todo._id)}>
                      <RestoreIcon />
                    </IconStyled>
                    <IconStyled onClick={() => handleDeleteTodo(todo._id)}>
                      <DeleteIcon />
                    </IconStyled>
                  </CardActions>
                </CardStyled>
              </Grid>
            ))}
          </Grid>
        </SectionStyled>
      )}

      {tabIndex === 2 && (
        <SectionStyled bgcolor="#212121" shadowColor="rgba(255, 0, 0, 0.5)">
          <HeadingStyled>Trash Bin</HeadingStyled>
          <Grid container spacing={2}>
            {deletedTodos.map(todo => (
              <Grid item xs={12} md={6} lg={4} key={todo._id}>
                <CardStyled>
                  <CardContent>
                    <Typography variant="h6">{todo.title}</Typography>
                    <Typography variant="body1">{todo.description}</Typography>
                  </CardContent>
                  <CardActions>
                    <IconStyled onClick={() => handleRestoreTodo(todo._id)}>
                      <RestoreIcon />
                    </IconStyled>
                    <IconStyled onClick={() => handlePermanentDeleteTodo(todo._id)}>
                      <DeleteIcon />
                    </IconStyled>
                  </CardActions>
                </CardStyled>
              </Grid>
            ))}
          </Grid>
        </SectionStyled>
      )}

      <DialogStyled open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
        <DialogTitle>Edit Todo</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="title"
            label="Title"
            type="text"
            fullWidth
            value={editTodo?.title || ''}
            onChange={handleEditChange}
          />
          <TextField
            margin="dense"
            name="description"
            label="Description"
            type="text"
            fullWidth
            value={editTodo?.description || ''}
            onChange={handleEditChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleEditSubmit} color="primary">
            Save
          </Button>
        </DialogActions>
      </DialogStyled>
    </ContainerStyled>
  );
};

export default TodoList;
