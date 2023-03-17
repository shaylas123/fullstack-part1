
//1.1-1.5
// const Header = (props) => {
//   return (
//     <div>
//       <h1>{props.course}</h1>
//     </div>
//   )
// }

// const Part = (props) => {
//   return (
//     <div>
//       <p>
//         {props.part} {props.exercises}
//       </p>
//     </div>
//   )
// }
// const Content = (props) => {
//   return (
//     <div>
//       <Part part={props.parts[0].name} exercises={props.parts[0].exercises} />
//       <Part part={props.parts[1].name} exercises={props.parts[1].exercises} />
//       <Part part={props.parts[2].name} exercises={props.parts[2].exercises} />
//     </div>
//   )
// }

// const Total = (props) => {
//   return (
//     <div>
//         <p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
//     </div>
//   )
// }

// const App = () => {
//   const course = {
//     name: 'Half Stack application development',
//     parts: [
//       {
//         name: 'Fundamentals of React',
//         exercises: 10
//       },
//       {
//         name: 'Using props to pass data',
//         exercises: 7
//       },
//       {
//         name: 'State of a component',
//         exercises: 14
//       }
//     ]
//   }

//   return (
//     <div>
//       <Header course={course.name}/>
//       <Content 
//         parts={course.parts} 
//       />
//       <Total 
//         parts={course.parts}
//       />
//     </div>
//   )
// }

// export default App

//****************************************************************************** */



//******************************************************************************
//1.6-1.11
// import { useState } from 'react'

// const Display = ({ value }) => <h3>{value}</h3>

// const StatisticLine = ({ text, value }) => {
//   return (
//     <>
//     <tr>
//       <td>{text}</td>
//       <td>{value}</td>
//     </tr>
//     </>
//   )
// }
// const DisplayStatistics = ({ good, neutral, bad }) => {
//   if (good === 0 && neutral === 0 && bad === 0) {
//     return (
//       <p>No feedback given</p>
//     )
//   }

//   const sum = good + bad + neutral;
//   const average = (good - bad) / sum;
//   const positive = ((good / sum) * 100);

//   return(
//     <div>
//       <table>
//         <StatisticLine text="good" value ={good} />
//         <StatisticLine text="neutral" value ={neutral} />
//         <StatisticLine text="bad" value ={bad} />
//         <StatisticLine text="all" value ={sum} />
//         <StatisticLine text="average" value ={average} />
//         <StatisticLine text="positive" value ={positive} />
//       </table>
//     </div>
//   )

// }

// const Button = ({ handleClick, text }) => {
//   return(
//     <button onClick={handleClick}>
//       {text}
//     </button>
//   )
// }

// const App = () => {
//   // save clicks of each button to its own state
//   const [good, setGood] = useState(0)
//   const [neutral, setNeutral] = useState(0)
//   const [bad, setBad] = useState(0)

//   const increaseFeedback = feedback => {
//     if (feedback === 'good') {
//       setGood(good + 1)
//     }
//     if (feedback === 'neutral') {
//       setNeutral(neutral + 1)
//     }
//     if (feedback === 'bad') {
//       setBad(bad + 1)
//     }
//   }


//   return (
//     <div>
//       <Display value='give feedback' />
//       <Button handleClick={ () => increaseFeedback('good')} text='good' />
//       <Button handleClick={ () => increaseFeedback('neutral')} text='neutral' />
//       <Button handleClick={ () => increaseFeedback('bad')} text='bad' />
//       <Display value='statistics' />
//       <DisplayStatistics good={good} neutral={neutral} bad={bad}/>
//     </div>
//   )
// }

// export default App

//************************************************************** */
//1.12-1.14

import { useState } from 'react'
const Button = ({ handleClick, text }) => {
  return(
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const HighestVote = ({ anecdote, score }) => {
  return(
    <div>
      <h3>Anecdote with most votes</h3>
      {anecdote}
      <p>has {score} votes</p>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

   
  const [selected, setSelected] = useState(0)
  const [scoring, setScoring] = useState(new Array(anecdotes.length).fill(0))
  const [highScore, setHighScore] = useState({
    anecdote: "If it hurts, do it more often", score: 0
  })
  const setRandom = () => {
    const randomIndex = Math.floor(Math.random() * anecdotes.length);
    setSelected(randomIndex);
  }

  const voteAnecdote = () => {
    const copy = [...scoring];
    copy[selected] += 1;
    setScoring(copy);

    if (copy[selected] > highScore.score) {
      const newHighest = { 
        anecdote: anecdotes[selected], 
        score: copy[selected] 
      }
      setHighScore(newHighest);
    }
  }

  return (
    
    <div>
      <h3>Anecdote of the day</h3>
      {anecdotes[selected]}
      <p>has {scoring[selected]} votes</p>
      <div>
        <Button handleClick={setRandom} text="next anecdote" />
        <Button handleClick={voteAnecdote} text="vote" />
        <HighestVote anecdote={highScore.anecdote} score={highScore.score} />
      </div>
    </div>
  )
}

export default App