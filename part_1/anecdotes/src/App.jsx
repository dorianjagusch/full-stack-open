import { useState } from 'react'

const Section = ({header}) => <h2>{header}</h2>

const Button = ({onClick, text}) => {
	return (
		<button onClick={onClick}>
			{text}
		</button>
	)
}

const DisplayQuote = ({anecdote, votes, isFavourite}) => {

	if (isFavourite && votes === 0 ){
		return (
			<p>No votes have been given yet</p>
		)
	}

	return (
	<>
		<div>
			{anecdote}
		</div>
		<div>
			has {votes} votes
		</div>
	</>
	)
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  const [selected, setSelected] = useState(Math.floor(Math.random() * anecdotes.length))
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

  const getMax = () => {
	let maximum = votes[0];
	let index = 0
	for (let i = 1; i < votes.length; i++){
		if (maximum < votes[i]){
			maximum = votes[i];
			index = i;
		}
	}
	return index
  }

  const maxVotes = getMax(votes)

  const randomizeQuote = () => {
	setSelected(Math.floor(Math.random() * anecdotes.length))
  }

  const upvoteQuotes = () => {
	const arrayCopy = [...votes];
	arrayCopy[selected] += 1;
	setVotes(arrayCopy)
  }

  return (
	<>
		<Section header="Anecdote of the Day" />
		<DisplayQuote anecdote={anecdotes[selected]} votes={votes[selected]} isFavourite={false} />
		<Button onClick={upvoteQuotes} text="vote"/>
		<Button onClick={randomizeQuote} text="next anecdote" />
		<Section header="Anecdote with most votes" />
		<DisplayQuote anecdote={anecdotes[maxVotes]} votes={votes[maxVotes]} isFavourite={true}/>
	</>
  )
}

export default App