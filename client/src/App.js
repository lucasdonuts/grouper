import './App.css';
import { Switch, Route } from 'react-router-dom';
import { useState } from 'react';
import NewUser from './components/NewUser';
import NavBar from './components/NavBar';
import Home from './components/Home';
import Login from './components/Login';
import Profile from './components/Profile';
import GroupsPage from './components/GroupsPage';

function App() {
  const [ currentUser, setCurrentUser ] = useState(false);

  const updateCurrentUser = (user) => {
    setCurrentUser(user)
  }

  return (
    <div className="main">
      <NavBar currentUser={ currentUser } updateCurrentUser={ updateCurrentUser } />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/signup">
          <NewUser updateCurrentUser={ updateCurrentUser } />
        </Route>
        <Route path="/login">
          <Login updateCurrentUser={ updateCurrentUser } />
        </Route>
        <Route path="/users/:id">
          <Profile currentUser={ currentUser } />
        </Route>
        <Route path="/groups">
          <GroupsPage currentUser={ currentUser } />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
