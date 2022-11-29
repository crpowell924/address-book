import './styles/App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Contacts from './components/Contacts';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        Address Book
      </header>
      <Contacts/>
    </div>
  );
}

export default App;
