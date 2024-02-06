import { useState } from 'react'

const Display = (props) => {
  return (
    <div>{props.counter}</div>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.onClick}>
      {props.text}
    </button>
  )
}
const App = () => {
  const [ counter, setCounter ] = useState(0)
  console.log('renderización con valor de contador', counter)

  const increaseByOne = () => setCounter(counter + 1)
  console.log('en aumento, valor antes', counter)

  const decreaseByOne = () => setCounter(counter - 1)
  console.log('decreciente, valor antes de', counter)
  const setToZero = () => setCounter(0)
  console.log('puesta a cero, valor antes de', counter)

  return (
    <div>
      <Display counter={counter}/>

      <Button
        onClick={increaseByOne}
        text='plus' 
      />
      <Button
        onClick={setToZero}
        text='zero'
      />     
      <Button
        onClick={decreaseByOne}
        text='minus'
      />           
    </div>
  )
}

export default App
