import { useState } from 'react'


const StatisticsLine = (props) => {
  if(props.text === 'positive'){
    return (
      <tr>
        <td>{props.text}</td>
        <td>{props.value} %</td>
      </tr>
    )
  }

  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}

const Statistics = ({good, neutral, bad}) => {
  if(good + neutral + bad === 0) {
    return ( 
      <div>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </div>
    )
  }

  return (
    <div>
      <h1>statistics</h1>
      <table>
        <tbody>
          <StatisticsLine text="good" value={good} />
          <StatisticsLine text="neutral" value={neutral} />
          <StatisticsLine text="bad" value={bad} />
          <StatisticsLine text="all" value={good + neutral + bad} />
          <StatisticsLine text="average" value={(bad * -1 + good) / (good + neutral + bad)} />
          <StatisticsLine text="positive" value={good / (good + neutral + bad) * 100} />
        </tbody>
      </table>
    </div>
  )
}

const Button = ({ handleClick, text }) => <button onClick={handleClick}> {text}</button>

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => setGood(good + 1)
  const handleNeutralClick = () => setNeutral(neutral + 1)
  const handleBadClick = () => setBad(bad + 1)

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGoodClick} text='Good' />
      <Button handleClick={handleNeutralClick} text='Neutral' />
      <Button handleClick={handleBadClick} text='Bad' />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App