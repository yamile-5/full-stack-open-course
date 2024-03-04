import React, { useState, useEffect } from 'react';
import Note from "./components/Note";
import noteService from './services/notes';

const App = () => {
  // Definición de estados utilizando el hook useState
  const [notes, setNotes] = useState([]); //almacena las notas
  const [newNote, setNewNote] = useState(''); //almacena el contenido de la nueva nota
  const [showAll, setShowAll] = useState(true); // controla si se muestran todas las notas

  // Efecto que se ejecuta al montar el componente para obtener todas las notas
  useEffect(() => {
    // Llama a la función getAll del servicio de notas
    noteService.getAll()
      .then(initialNotes => {
        // Actualiza el estado notes con las notas obtenidas
        setNotes(initialNotes);
      });
  }, []);

  // Función para agregar una nueva nota
  const addNote = (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
    };
    // Llama a la función create del servicio de notas para crear una nueva nota
    noteService.create(noteObject)
      .then(returnedNote => {
        // Agrega la nueva nota 
        setNotes([...notes, returnedNote]);
        // Limpia el input 
        setNewNote('');
      });
  };

  //manejar cambio en el input 
  const handleNoteChange = (event) => {
    setNewNote(event.target.value);
  };

  // Función para cambiar la importancia de una nota
  const toggleImportanceOf = id => {
    const note = notes.find(n => n.id === id);
    const changedNote = { ...note, important: !note.important };

    // Llama a la función update del servicio de notas para actualizar la importancia de la nota
    noteService.update(id, changedNote)
      .then(returnedNote => {
        // Actualiza el estado notes con la nota modificada
        setNotes(notes.map(note => note.id !== id ? note : returnedNote));
      })
      .catch(error => {
        // Muestra una alerta si se produce un error al actualizar la nota
        alert(`The note '${note.content}' was already deleted from server`);
        // Elimina la nota del estado notes
        setNotes(notes.filter(n => n.id !== id));
      });
  };

  // Filtra las notas
  const notesToShow = showAll ? notes : notes.filter(note => note.important === true);

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {/*Renderiza las notas*/}
        {notesToShow.map(note =>
          <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)} />
        )}
      </ul>
      {/* Formulario para agregar una nueva nota */}
      <form onSubmit={addNote}>
        <input 
          value={newNote}
          onChange={handleNoteChange}
        />
        <button type="submit">save</button>
      </form>   
    </div>
  );
};

export default App;
