import { Accordion } from 'react-bootstrap';

const Contact = ({ address, index }) => {
    return (
      <Accordion.Item eventKey={index}>
        <Accordion.Header>{address.name}</Accordion.Header>
        <Accordion.Body>
            {address.street}
        </Accordion.Body>
      </Accordion.Item>
    );
}

export default Contact;