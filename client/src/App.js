import React, { useState } from 'react'

import  Posts  from './screens/Posts';
import  User  from './components/credentials'
import SinglePost from './screens/SinglePost';

import { Modal, Input, Button, Container } from 'semantic-ui-react'

import { ToastContainer, toast } from 'react-toastify'
import { Route, Switch } from 'react-router-dom';

import './App.css';

const App = () => {

  const [user, setUser] = useState(false)
  const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    })
    const { username, password } = credentials

    const handChange = (e) => {
        const { name, value } = e.target
        setCredentials({
            ...credentials,
            [name]: value
        })
    }

    const handleLogin = () => {
      if(username === "" || password === ""){
               return toast.error("Fields are empty")
            }
      if(User.username === username && User.password === password){
        setUser(true)
        setCredentials({
          username: '',
          password: ''
        })
        toast.success("Welcome!")
      } else {
        setCredentials({
          username: '',
          password: ''
        })
        return toast.error("Incorrect")
      }
    }

    const handleLogout = () => {
      setUser(false)
    }

  return (
    <div className="App">
      {
        user ? 
          <>
            <p>hello! {User.username}</p>
            <Button secondary onClick={handleLogout}>Logout</Button>
          </>
          :
          <Modal
            basic
            trigger={<Button>Login In</Button>}
            size='small'
          >
            <Container>
              <Input focus type='name' name='username' value={username} placeholder='username' onChange={handChange}></Input>
              <Input focus type='password' name='password' value={password} placeholder='password' onChange={handChange}></Input>
              <Button primary onClick={handleLogin}>Log In</Button>
            </Container>
          </Modal>
      }
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        pauseOnHover
      />
      <br /><br /><br />
      <Container textAlign='center'>
        <h1>All products</h1>
        <Switch>
          <Route exact path="/">
            <Posts user={user}/>
          </Route>
          <Route exact path="/details/:id">
            <SinglePost user={user}/>
          </Route>
        </Switch>
      </Container>
    </div>
  );
}

export default App;
