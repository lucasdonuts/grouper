import './App.css';
import { Switch, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import NewUser from './components/NewUser';
import NavBar from './components/NavBar';
import Home from './components/Home';
import Login from './components/Login';
import Profile from './components/Profile';
import GroupsList from './components/GroupsList';
import GroupPage from './components/GroupPage';
import NewGroupForm from './components/NewGroupForm';
import UserGroups from './components/UserGroups';

function App() {
  const [ currentUser, setCurrentUser ] = useState(false);

  useEffect( () => {
    fetch('/me')
      .then( res => {
        if(res.ok){
          res.json().then(setCurrentUser)
        }
      })
  }, [])

  const updateCurrentUser = (user) => {
    setCurrentUser(user)
  }

  return (
    <div className="">
      <NavBar currentUser={ currentUser } updateCurrentUser={ updateCurrentUser } />
      <div className="m-auto max-w-3xl">
        <Switch>
          <Route exact path="/">
            { currentUser ? <Profile currentUser={ currentUser } /> : <Home /> }
          </Route>
          <Route path="/signup">
            <NewUser updateCurrentUser={ updateCurrentUser } />
          </Route>
          <Route path="/login">
            <Login updateCurrentUser={ updateCurrentUser } />
          </Route>
          <Route exact path="/users/:id">
            <Profile currentUser={ currentUser } />
          </Route>
          <Route path="/groups/new">
            <NewGroupForm />
          </Route>
          <Route path="/groups/:id">
            <GroupPage currentUser={ currentUser } updateCurrentUser={ updateCurrentUser } />
          </Route>
          <Route path="/groups">
            <GroupsList currentUser={ currentUser } />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;
