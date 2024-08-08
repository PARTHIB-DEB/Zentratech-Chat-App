// import { useState } from 'react'
import './App.css'
import Getreq from './components/getreq'
import Login from './components/login'
import Register from './components/register'
import Sendreq from './components/sendreq'

function App() {
  // const [count, setCount] = useState(0)
  
  return (
    <>
    <Register/>
    <Sendreq/>
    <Getreq/>
    <Login/>
    </>
  )
}

export default App
