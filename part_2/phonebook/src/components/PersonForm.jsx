const PersonForm = (props) => {
	return (
		<form onSubmit={props.onSubmit}>
			<div>
				name: <input name="new-contact" value={props.name}
							 onChange={props.onChangeName}/><br />
				number: <input name="new-phonenumber" value={props.number}
							   onChange={props.onChangeNumber}/>
			</div>
			<div>
				<button type="submit">add</button>
			</div>
		</form>
	)
}

export default PersonForm