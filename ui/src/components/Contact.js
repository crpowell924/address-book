import { useEffect, useState } from 'react';
import { Accordion, Button } from 'react-bootstrap';
import { cityStateLookup } from '../api-calls/api';

const Contact = ({ address, index, handleDelete }) => {
    const [city, setCity] = useState("");
    const [geoState, setGeoState] = useState("");

    useEffect(() => {
      if (address.zip) {
        cityStateLookup(address.zip)
          .then(resp => {
            setCity(resp.city);
            setGeoState(resp.state);
          })
      }
    },[address.zip])

    return (
      <Accordion.Item eventKey={index}>
        <Accordion.Header>{address.name}</Accordion.Header>
        <Accordion.Body>
            {address.address1}
            <br/>
            {address.address2}
            <br/>
            {city}, {geoState}
            <br/>
            {address.zip}
            <br/>
            {address.phone}
            <br/>
            {address.email}
            <br/>
            <Button variant="danger" onClick={() => handleDelete(address._id)}>Delete</Button>
        </Accordion.Body>
      </Accordion.Item>
    );
}

export default Contact;