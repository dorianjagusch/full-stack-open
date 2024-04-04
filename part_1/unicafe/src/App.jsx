import { useState } from 'react'

const Section = ( {header} ) => <h1>{header}</h1>

const Button = ({onClick, text}) => {
	return (
		<button onClick={onClick}>
			{text}
		</button>
	)
}

const StatisticLine = ({text, value}) =>  {
	return (
		<tr>
			<td>{text}:</td>
			<td>{value}</td>
		</tr>
	)
}
const Statistics = ({good, neutral, bad}) => {

	const totalVotes = good + neutral + bad;

	if (totalVotes === 0){
		return (
			<p>No feedback given</p>
		)
	}
	return (
		<table>
			<tbody>
			<StatisticLine text="good" value={good}/>
			<StatisticLine text="neutral" value={neutral}/>
			<StatisticLine text="bad" value={bad}/>
			<StatisticLine text="all" value={totalVotes}/>
			<StatisticLine text="average" value={(good - bad) / totalVotes}/>
			<StatisticLine text="positive" value={good / totalVotes * 100 + '%'}/>
			</tbody>
		</table>
	)
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


	const increaseGood= () => {;
		setGood(good + 1);
	}

	const increaseNeutral= () => {
		setNeutral(neutral + 1)
	}
	const increaseBad= () => {
		setBad(bad + 1)
	}

  return (
    <div>
      <Section header="give feedback" />
	  <Button onClick={increaseGood} text="good" />
	  <Button onClick={increaseNeutral} text="neutral" />
	  <Button onClick={increaseBad} text="bad" />
	  <Section header="statistics"/>
	  <Statistics good={good}
				  neutral={neutral}
				  bad={bad} />
    </div>
  )
}

export default App