import { useState } from 'react'
import './App.css'

function App() {
  const [input, setinput] = useState('');
  const [todo, settodo] = useState([]);
  const [editmode, seteditmode] = useState(false);
  const [editid, seteditid] = useState(null);
  const [editvalue, seteditvalue] = useState('');


  const addtodo = () => {
    if (input.trim() !== '') {
      const newtodo = {
        id: new Date().getTime(),
        text: input,
      }
      settodo([...todo, newtodo]);
      setinput('');
    }
  }

  const deletetodo = (id) => {
    const updatetodo = todo.filter(todo => todo.id !== id)
    settodo(updatetodo);
  }

  const EnterEditMode = (id, text) => {
    seteditmode(true);
    seteditid(id);
    seteditvalue(text);
  }

  const updatetodo = () => {
    const updatetodo = todo.map(todo => {
      if (todo.id === editid) {
        return { ...todo, text: editvalue }
      }
      return todo;
    })
    settodo(updatetodo);
    seteditmode(false);
    seteditid(null);
    seteditvalue('');
  }

  return (

    <div className='todo-container'>
      <h2>TODO List</h2>
      <input type="text"
        value={input}
        onChange={(e) => setinput(e.target.value)}
      />

      {editmode ? (
        <div>
          <input type="text" value={editvalue} onChange={(e) => seteditvalue(e.target.value)} />
          <button onClick={updatetodo}>Update</button>
        </div>
      ) : (
        <button onClick={addtodo}>Add</button>
      )}

      <ul>
        {todo.map((todo) => (
          <li key={todo.id}>{todo.text}
            <button onClick={() => deletetodo(todo.id)}>Delete</button>
            <button onClick={() => EnterEditMode(todo.id, todo.text)}>Edit</button>
          </li>

        ))}
      </ul>
    </div>

  )
}

export default App