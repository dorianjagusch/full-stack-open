import { useState, useEffect} from 'react'
import axios from 'axios'
import PersonForm from './components/PersonForm'
import DisplayPeople from './components/DisplayPeople'
import Filter from './components/Filter'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    axios
    .get("http://localhost:3001/persons")
    .then((response) => {
      console.log(persons)
      setPersons(response.data)
    })

  }, [])

  const handleNewName = (event) => {
  setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
  setNewNumber(event.target.value)
  }

  const handleNewFilter = (event) => {
  setNewFilter(event.target.value)
  }

  const addNewContact = (event) => {
  event.preventDefault()
  if (!newName || !newNumber){
    alert('Name and Number cannot be empty')
    return
  }
  if (persons.filter((person) => person.name === newName).length !== 0){
    alert(`${newName} is already added in phonebook`)
    return
  }
  const newContact = {
    name: newName,
    number: newNumber,
    id: persons.length + 1
  }

  setPersons(persons.concat(newContact))
  setNewName('')
  setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
    <Filter onChange={handleNewFilter} filter={newFilter}/>
    <h3>Add a new</h3>
    <PersonForm onSubmit={addNewContact}
            onChangeName={handleNewName}
          name={newName}
          onChangeNumber={handleNewNumber}
          number={newNumber}/>
    <h3>Number</h3>
    <DisplayPeople persons={persons} filter={newFilter} />
  </div>
  )
}

export default App