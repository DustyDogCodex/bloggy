import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Navigation } from './components/Navigation'
import { About } from './components/About'
import { Homepage } from './pages/Homepage'
import { PostPage } from './pages/PostPage'
import { AddBlog } from './pages/AddBlog'
import { Account } from './pages/Account'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Footer } from './components/Footer'
import { useContext } from 'react'
import { MyContext } from './MyContext'
import UserProfile from './pages/UserProfile'
import Dashboard from './pages/Dashboard'
import MyPosts from './pages/MyPosts'
import EditPost from './components/EditPost'
import PageNotFound from './pages/PageNotFound'
import Profile from './components/Profile'
import MyProfile from './pages/MyProfile'

function App() {
  //using context to check for a logged in user.
  //if we have a logged in user, certain pages like register/login will redirect to homepage. This is because if we already have a user logged in, it makes no sense to show them these pages.
  //similarly, addBlog page will only be showed to users that are logged in to prevent anonymous posts.

  const { userInfo } = useContext(MyContext)

  return (
    <>
        <Navigation />
        <BrowserRouter>
            <Routes>
                <Route 
                    path='/' 
                    element={ <Homepage/> }
                />
                <Route 
                    path='register' 
                    element={ userInfo ? <Homepage/> : <Register/> }
                />
                <Route 
                    path='login' 
                    element={ userInfo ? <Homepage/> : <Login/> }
                />
                <Route 
                    path='addblog' 
                    element={ userInfo ? <AddBlog/> : <Login/> }
                />
                <Route 
                    path='post/:blogId' 
                    element={ <PostPage/> }
                />
                <Route 
                    path='user/:userId' 
                    element={ <UserProfile /> }
                />
                {/* user dashboard and associated subroutes */}
                <Route 
                    path='dashboard' 
                    element={ userInfo ? <Dashboard /> : <Login/> }
                >
                    <Route index element={<MyPosts />} />
                    <Route path='account' element={<Account />} />
                    <Route path='profile' element={<MyProfile />} />
                    <Route path='edit/:postId' element={<EditPost />} />
                </Route>
                <Route 
                    path='about' 
                    element={ <About/> }
                />
                {/* page not found catch-all */}
                <Route path='*' element={<PageNotFound />} />
            </Routes>
        </BrowserRouter>
        <Footer/>
    </>
  )
}

export default App
