import './styles/App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Contacts from './components/Contacts';
import AddContact from './components/AddContact';
import { useEffect, useState } from 'react';
import { listAddresses } from './api-calls/api';

function App() {
  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    listAddresses()
      .then((res) => setAddresses(res))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        Address Book
      </header>
      <div className="App-body">
        <Contacts addresses={addresses} setAddresses={setAddresses}/>
        <AddContact addresses={addresses} setAddresses={setAddresses}/>
      </div>
    </div>
  );
}

export default App;
