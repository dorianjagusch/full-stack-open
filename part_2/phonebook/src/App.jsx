import { useState } from 'react'
import PersonForm from './components/PersonForm'
import DisplayPeople from './components/DisplayPeople'
import Filter from './components/Filter'

const App = () => {
  const [persons, setPersons] = useState([
	{ name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

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