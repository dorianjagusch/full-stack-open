
const Header = ({text}) => <h1>{text}</h1>

const Part = ({part}) => {
	return (
		<p>{part.name}: {part.exercises}</p>
	)
}

const Content = ({parts}) => {
	return (
		<div>
			{parts.map((part) => <Part key={part.id} part={part}/>)}
		</div>
	)
}

const Footer = ({parts}) => {
	const total = parts.reduce((sum, part) => {return sum + part.exercises}, 0)
	return (
		<p><strong>total of {total} exercises</strong></p>
	)
}

const Course = ({course}) => {
	return (
		<>
			<Header text={course.name} />
			<Content parts={course.parts}/>
			<Footer parts={course.parts} />
		</>
	)
}

export default Course