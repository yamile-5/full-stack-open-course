import { useState } from 'react'

const Display = props => <div>{props.value}</div>

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const App = () => {
  const [value, setValue] = useState(10)

  const setToValue = (newValue) => {
    console.log('value now', newValue)
    setValue(newValue)
  }

  return (
    <div>
      
    <button onClick={() => setValue(1000)}>
        value
      </button>
      <button onClick={() => setValue(0)}>
        
      </button>
      <button onClick={() => setValue(value + 1)}>
        bad
      </button>
    </div>
  )
}

export default App
