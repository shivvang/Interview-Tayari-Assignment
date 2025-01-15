
import CreateSubmission from './Pages/CreateSubmission'
import DashBoard from './Pages/DashBoard'
import Login from './Pages/Login'
import Register from './Pages/register'
import  {Route,Routes} from "react-router-dom"

function App() {
  return (
    <Routes>
      <Route path='/register' element={<Register/>} />
      <Route path='/login' element={<Login/>}/>
      <Route path='/dashboard' element={<DashBoard/>}/>
      <Route path='/createSubmission' element={<CreateSubmission/>}/>
    </Routes>
  )
}

export default App