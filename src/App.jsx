import "./style.css";
import { useEffect, useState } from 'react';

export default function App () {
  const [newItem, setNewItem] = useState('')
  const [groceries, setGroceries] = useState(() => {
    const localValue = localStorage.getItem('ITEMS')
    if (localValue == null) return []
    
    return JSON.parse(localValue)
  })

  useEffect(() => {
    localStorage.setItem('ITEMS', JSON.stringify(groceries))
  }, [groceries])

  function handleSubmit(e) {
    e.preventDefault()
    if (newItem === '') return
    setGroceries((currentGroceries) => {
      return [
        ...currentGroceries,
        { id: crypto.randomUUID(), title: newItem, completed: false },
      ]
    })

    setNewItem('')
  }

  function toggleGrocery( id, completed) {
    setGroceries(currentGroceries => {
      return currentGroceries.map (grocery => {
        if (grocery.id === id) {
          return { ...grocery, completed }
        }

        return grocery
      })
    })
  }

  function deleteGrocery(id) {
    setGroceries(currentGroceries => {
      return currentGroceries.filter(grocery => grocery.id !== id)
    })
  }

  return <>
  <form onSubmit={handleSubmit} className="new-item-form">
    <div className ="form-row">
      <label htmlFor='item'>Groceries</label>
      <input 
      value={newItem} 
      onChange={e => setNewItem(e.target.value)} 
      type='text' 
      id='item' 
      />
    </div>
    <button className='btn'>
      Add
    </button>
  </form>
      <h1 className='header'>
      Groceries List
    </h1>
    <ul className='list'>
      {groceries.length === 0 && 'No Groceries Needed'}
      {groceries.map(grocery => {
        return <li key={grocery.id}>
        <label>
          <input type='checkbox' checked={grocery.completed} onChange={e => toggleGrocery(grocery.id, e.target.checked)} />
          {grocery.title}
        </label>
        <button onClick={() => deleteGrocery(grocery.id)} 
        className='btn btn-danger'>Delete</button>
      </li>
      })}
    </ul>
  </>
}
