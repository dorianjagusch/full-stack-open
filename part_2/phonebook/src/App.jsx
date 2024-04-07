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
    .catch(() => console.log("Error"))
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


  const addNewContact = (newContact) => {
    personService
    .create(newContact)
    .then((returnedContact) => {
      setPersons(persons.concat(returnedContact))
      setNewName('')
      setNewNumber('')
    })
    .catch((error) => console.log(error))
  }

  const editContact = (toEditContact) => {
    if (!confirm(`${toEditContact} is already in the phone book,
        replace the old number with a new one?`)){
          return
        }
    personService
    .update(toEditContact)
    .then(returnedContact => {
      console.log(returnedContact)
      return setPersons(persons.map((person) => person.id !== returnedContact.id
        ? person : returnedContact) )
    })
    .catch((error) => {console.log(error)})
  }

  const addEntry = (event) => {
    event.preventDefault()
    if (!newName || !newNumber){
      alert('Name and Number cannot be empty')
      return
    }

    const newContact = {
      name: newName,
      number: newNumber
    }

    const contactFound = persons.find((person) => person.name === newName)
    if (contactFound){
      newContact.id = contactFound.id
      editContact(newContact)
    } else {
      addNewContact(newContact)
    }
    setNewName('')
    setNewNumber('')
    return

  }

  const deleteContact = (name, id) => {
    if (!confirm(`Delete ${name}`)) {return}
      personService
      .remove(id)
      .then((deletedContact) => {
          const filtered = persons.filter((person) => person.id !== deletedContact.id)
          setPersons(filtered)
        })
        .catch(() => console.log("Error"))
  }

  return (
    <div>
      <h2>Phonebook</h2>
    <Filter onChange={handleNewFilter} filter={newFilter}/>
    <h3>Add a new</h3>
    <PersonForm onSubmit={addEntry}
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