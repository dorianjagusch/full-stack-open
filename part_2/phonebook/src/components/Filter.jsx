const Filter = ({onChange, filter}) => {
	return (
		<p>filter shown with: <input name="filter-box" value={filter} onChange={onChange}/>
		</p>
	)
}

export default Filter