import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Auth } from './components/auth/Auth';
import { Home } from './components/home/Home';
import { About } from './components/developer/About'
import { GlobalProvider } from './context/global/GlobalStates'
import { Navbar } from './components/navbar/Navbar'
import { Profile } from './components/profileView/profile/Profile'
import { Form } from './components/createPost/Form'
import { PostView } from './components/postsView/PostView'
import { SnackbarProvider } from 'notistack'
import { ForgetPass } from './components/auth/ForgetPass';
import { Error } from './components/developer/error';

const App = () => {

  return (
    <div style={{ maxWidth: "63rem", margin: "0 auto" }}>
      <SnackbarProvider maxSnack={3}
        iconVariant={{
          success: '✔ ',
          error: '✖️ ',
          warning: '⚠️ ',
          info: 'ℹ️ ',
        }}
      >
        <GlobalProvider>
          <Router>
            <Navbar />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/about" component={About} />
              <Route exact path="/user/auth" component={Auth} />
              <Route exact path="/user/forgetPassword" component={ForgetPass} />
              <Route exact path="/post/createPost" component={Form} />
              <Route path="/post/postView/:id" component={PostView} />
              <Route path="/user/profile/:username" component={Profile} />
              <Route component={Error} />
            </Switch>
          </Router>
        </GlobalProvider>
      </SnackbarProvider>
    </div>
  )
}

export default App