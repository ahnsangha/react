import MyB from "./MyButton"
import { Button1, Button3 } from "./ButtonLib"
import AP from "./AboutPage"
import Profile from "./Profile"

export default function App() {
  return (
    <div>
      <h1>Hello React</h1>
      <MyB /> <br />
      <Button1 />&nbsp;
      <Button3 />
      <AP />
      <Profile />
    </div>
  )
}