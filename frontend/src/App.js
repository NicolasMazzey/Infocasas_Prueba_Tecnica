import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

const API_BASE = 'http://localhost:8080';

function App() {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState('');
  const [newTaskName, setNewTaskName] = useState('');
  const [dragOverColumn, setDragOverColumn] = useState(null);

  const loadTasks = async () => {
    try {
      const params = {};
      if (search) params.search = search;
      const response = await axios.get(`${API_BASE}/tasks`, { params });
      setTasks(response.data);
    } catch {
      alert('Error al cargar tareas');
    }
  };

  useEffect(() => {
    loadTasks();
  }, [search]);

  const handleCreateTask = async () => {
    if (!newTaskName.trim()) return;
    try {
      await axios.post(`${API_BASE}/tasks`, { name: newTaskName, completed: false });
      setNewTaskName('');
      loadTasks();
    } catch {
      alert('Error al crear tarea');
    }
  };

  const updateTaskCompletion = async (id, completed) => {
    try {
      await axios.put(`${API_BASE}/tasks/${id}`, { completed });
      loadTasks();
    } catch {
      alert('Error al actualizar tarea');
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await axios.delete(`${API_BASE}/tasks/${id}`);
      loadTasks();
    } catch {
      alert('Error al eliminar tarea');
    }
  };

  const incompleteTasks = tasks.filter(t => !t.completed);
  const completedTasks = tasks.filter(t => t.completed);

  const onDragStart = (e, id) => {
    e.dataTransfer.setData('text/plain', id.toString());
    e.dataTransfer.effectAllowed = 'move';
  };

  const onDragOver = (e, column) => {
    e.preventDefault();
    setDragOverColumn(column);
  };

  const onDrop = (e, completed) => {
    e.preventDefault();
    setDragOverColumn(null);
    const id = e.dataTransfer.getData('text/plain');
    if (!id) return;
    updateTaskCompletion(parseInt(id, 10), completed);
  };

  const onDragLeave = () => {
    setDragOverColumn(null);
  };

  return (
    <div className="app-container">
      <h1>Tablero de Tareas</h1>

      <div className="top-controls">
        <input
          placeholder="Nueva tarea..."
          value={newTaskName}
          onChange={e => setNewTaskName(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleCreateTask()}
          type="text"
        />
        <button onClick={handleCreateTask}>Crear</button>
      </div>

      <div className="top-controls">
        <input
          placeholder="Buscar tareas..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          type="text"
        />
      </div>

      <div className="columns-container">
        <div
          className={`column ${dragOverColumn === 'incomplete' ? 'drag-over' : ''}`}
          onDragOver={e => onDragOver(e, 'incomplete')}
          onDrop={e => onDrop(e, false)}
          onDragLeave={onDragLeave}
        >
          <h3>No Completadas</h3>
          {incompleteTasks.length === 0 && <p>No hay tareas aquí.</p>}
          {incompleteTasks.map(task => (
            <div
              key={task.id}
              draggable
              onDragStart={e => onDragStart(e, task.id)}
              className="task-card"
            >
              <span>{task.name}</span>
              <button
                onClick={() => handleDeleteTask(task.id)}
                className="delete-incomplete"
                title="Eliminar tarea"
              >
                ×
              </button>
            </div>
          ))}
        </div>

        <div
          className={`column completed ${dragOverColumn === 'completed' ? 'drag-over' : ''}`}
          onDragOver={e => onDragOver(e, 'completed')}
          onDrop={e => onDrop(e, true)}
          onDragLeave={onDragLeave}
        >
          <h3>Completadas</h3>
          {completedTasks.length === 0 && <p>No hay tareas aquí.</p>}
          {completedTasks.map(task => (
            <div
              key={task.id}
              draggable
              onDragStart={e => onDragStart(e, task.id)}
              className="task-card completed"
            >
              <span>{task.name}</span>
              <button
                onClick={() => handleDeleteTask(task.id)}
                className="delete-completed"
                title="Eliminar tarea"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
