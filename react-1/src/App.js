import MyB from "./MyButton"
import { Button1, Button3 } from "./ButtonLib"
import AP from "./AboutPage"
import Profile from "./Profile"
import './App.css'
import SL from "./ShoppingList"
import CountState from "./CountState"
import { useState } from "react"

function CountState2({ count, onClick }) {

    return (
      <div>
          <button onClick={onClick}>
              Clicked {count} times
          </button>
      </div>
    );
}

export default function App() {
  const [count, setCount] = useState(0)

  function handleClick() {
    setCount(count + 1)
  }

  return (
    <div className='wrapper'>
      
      <div>
        <h1>Hello React</h1>
        <MyB /> <br />
        <Button1 />&nbsp;
        <Button3 />
        <AP />
        <Profile />
        <SL />
      </div>
      
      <div>
        <h1>Hello Button</h1>
        <CountState />
        <CountState />
      </div>

      <div>
        <h1>Sharing data between components</h1>
        <CountState2 count={count} onClick={handleClick} />
        <CountState2 count={count} onClick={handleClick} />
      </div>
    
    </div>

  )
}