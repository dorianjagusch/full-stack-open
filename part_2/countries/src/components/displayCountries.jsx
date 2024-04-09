
const DisplayFullCountry = ({country}) => {

	return (
		<div className="country-display">
			<h1>{country.name.common}</h1>
			<h2>{country.name.official}</h2>
			<p>Capital {country.capital}</p>
			<p>Area {country.area}km<sup>2</sup></p>
			<h4>languages:</h4>
			<ul>
				{
					Object.keys(country.languages).map(
						(key, index) => {
							return <li key={index}>{country.languages[key]}</li>
						}
					)
				}
			</ul>
			<img src={country.flags.png}/>
		</div>
	)
}

const DisplayCountries = ({countries, onClick}) => {
	if (countries.length == 0){
		return <p>No matches found</p>
	}
	if (countries.length > 10){
		return (<p>Too many matches, specify another filter</p>)
	} else if (countries.length == 1){
		return <DisplayFullCountry country={countries[0]} />
	} else {
		return (
		<ul>
			{
				countries.map((country, index) => {
						return (
							<li key={index}>{country.name.common}
								<button onClick={() => onClick(index)}>Show</button>
							</li>
						)
					}
				)
			}
		</ ul>
		)
	}
}

export default DisplayCountries