import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import StudentRecordsViewer from "./StudentRecordsViewer.jsx";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
       <div className="w-full">
           <StudentRecordsViewer />
       </div>
    </>
  )
}

export default App
