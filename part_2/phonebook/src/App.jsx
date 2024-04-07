import { useState, useEffect} from 'react'
import PersonForm from './components/PersonForm'
import DisplayPeople from './components/DisplayPeople'
import Filter from './components/Filter'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {

  personService
    .getAll()
    .then((allContacts) => setPersons(allContacts))
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
      number: newNumber
    }

    personService
      .create(newContact)
      .then((returnedContact) => {
        setPersons(persons.concat(returnedContact))
        setNewName('')
        setNewNumber('')
    })
  }

  const deleteContact = (name, id) => {
    if (!confirm(`Delete ${name}`)) {return}
      personService
      .remove(id)
      .then((deletedContact) => {
          const filtered = persons.filter((person) => person.id !== deletedContact.id)
          setPersons(filtered)
        })
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
    <DisplayPeople persons={persons} filter={newFilter} onDelete={deleteContact} />
  </div>
  )
}

export default App