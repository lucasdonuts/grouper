import './App.css';
import NewUser from './components/NewUser';

function App() {

  const onLogin = (params) => {
    console.log(params)
  }

  return (
    <div className="App">
      {/* <header className="App-header">
        <h1>Grouper</h1>
      </header> */}
      <div>
        <NewUser onLogin={ onLogin } />
      </div>
    </div>
  );
}

export default App;
