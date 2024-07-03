import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import Blog from './pages/Blog'
import Blogs from './pages/Blogs'
import Layout from './components/Layout'
import NewBlog from './pages/NewBlog'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/signup' Component={Signup}/>
          <Route path='/signin' Component={Signin}/>

          <Route path="/" element={<Layout />}>
            <Route path='blog/:id' element={<Blog />}/>
            <Route path='blogs' element={<Blogs />}/>
            <Route path='blog/new' element={<NewBlog />} />
          </Route>
          
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
