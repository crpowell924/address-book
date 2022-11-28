import './styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Contacts from './components/Contacts';
import {callRoot} from './api-calls/api';
import { useEffect, useState } from 'react';

function App() {
  const [root, setRoot] = useState(null);

  useEffect(() => {
    callRoot()
      .then(res => setRoot(res.message))
      .catch(err => console.log(err))
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        {root || "Address Book"}
      <Contacts/>
      </header>
    </div>
  );
}

export default App;
