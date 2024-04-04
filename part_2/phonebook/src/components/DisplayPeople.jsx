
const DisplayPerson = ({person}) => {
	return (
		<tr>
			<td>{person.name}</td>
			<td>{person.number}</td>
		</tr>
	)
}

const DisplayPeople = ({persons, filter}) => {

		const contacts = !filter ? persons : persons.filter((person) => {
			return (person.name.toLocaleLowerCase().includes(filter.toLowerCase()))
		})

		return (
			<table>
				<tbody>
					{contacts.map((person) => <DisplayPerson key={person.id} person={person}/>)}
				</tbody>
			</table>
		)
}

export default DisplayPeople