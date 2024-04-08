import { useState, useEffect} from 'react'
import PersonForm from './components/PersonForm'
import DisplayPeople from './components/DisplayPeople'
import Filter from './components/Filter'
import Notification from './components/Notification'
import personService from './services/persons'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [userNotification, setNotification] = useState({message: null, success: null})

 const notificationTypes = Object.freeze({
	isError: 0,
	isAdd: 1,
	isUpdate: 2
 })

 const flashNotification = (contactName, notificationType) => {

	const message = [
		`Information of ${contactName} has already been removed from the server`,
		`Added ${contactName}`,
		`Updated ${contactName}`
	]
	console.log(notificationType)
	setNotification({message: message[notificationType],
					success: notificationType})

	setTimeout(() => {
			setNotification({message: null, success: null});
	}, 5000)

  }

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
	  flashNotification(returnedContact.name, notificationTypes.isAdd)
      setPersons(persons.concat(returnedContact))
    })
    .catch((error) => {console.log(error)})
  }

  const editContact = (toEditContact) => {
    if (!confirm(`${toEditContact} is already in the phone book,
        replace the old number with a new one?`)){
          return
        }
    personService
    .update(toEditContact)
    .then(returnedContact => {
	  flashNotification(returnedContact.name, notificationTypes.isUpdate)
      setPersons(persons.map((person) => person.id !== returnedContact.id
        ? person : returnedContact) )
    })
    .catch(() => {
		flashNotification(toEditContact.name, notificationTypes.isError)
		setPersons(persons.filter((person) => person.id !== toEditContact.id))
	})
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
    if (!confirm(`Delete ${name}`)) {
		return
	}
      personService
      .remove(id)
      .then((deletedContact) => {
          const filtered = persons.filter((person) => person.id !== deletedContact.id)
          setPersons(filtered)
      })
      .catch(() => {
			setPersons(persons.filter((person) => person.id !== id))
	  })
  }

  return (
    <div>
      <h2>Phonebook</h2>
	  <Notification notification={userNotification} />
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