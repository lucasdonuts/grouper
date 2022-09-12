import logo from './logo.svg';
import './App.css';
import NewUser from './components/NewUser';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Grouper</h1>
      </header>
      <div>
        <NewUser />
      </div>
    </div>
  );
}

export default App;
