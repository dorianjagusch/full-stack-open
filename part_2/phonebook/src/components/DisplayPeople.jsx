
const DisplayPerson = ({person, onClick}) => {
	return (
		<tr>
			<td>{person.name}</td>
			<td>{person.number}</td>
			<td><button onClick={onClick}>delete</button></td>
		</tr>
	)
}

const DisplayPeople = ({persons, filter, onDelete}) => {

		const contacts = !filter ? persons : persons.filter((person) => {
			return (person.name.toLocaleLowerCase().includes(filter.toLowerCase()))
		})

		return (
			<table>
				<tbody>
					{contacts.map((person) => <DisplayPerson
						key={person.id}
						person={person}
						onClick={() => onDelete(person.name, person.id)} />)}
				</tbody>
			</table>
		)
}

export default DisplayPeople