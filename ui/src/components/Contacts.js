import { Accordion } from 'react-bootstrap';
import Contact from './Contact'; 
import sample from '../sample-data.json';

const Contacts = () => {
    return (
        <Accordion>
            {sample.addresses.map(address => <Contact address={address}/>)}
        </Accordion>
    );
}

export default Contacts;