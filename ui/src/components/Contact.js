import { Accordion } from 'react-bootstrap';

const Contact = ({address}) => {
    return (
      <Accordion.Item eventKey={address.id}>
        <Accordion.Header>{address.name}</Accordion.Header>
        <Accordion.Body>
            {address.street}
        </Accordion.Body>
      </Accordion.Item>
    );
}

export default Contact;