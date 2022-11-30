import { Accordion, Button, Col, Row } from "react-bootstrap";

const Contact = ({ address, index, handleDelete }) => {
  return (
    <Accordion.Item eventKey={index}>
      <Accordion.Header>{address.name}</Accordion.Header>
      <Accordion.Body>
        <Row>
          <Col>
            <h3>Address</h3>
            <p>{address.address1}<br/>
            {address.address2 && (<>{address.address2}<br/></>)}
            {address.cityState}<br/>
            {address.zip}</p><br/>
          </Col>
          <Col>
            <h3>Contact Information</h3>
            <p>{address.email ? address.email : "No email"}</p>
            <p>{address.phone ? address.phone : "No phone number"}</p>
          </Col>
        </Row>
        <Button variant="danger" onClick={() => handleDelete(address._id)}>
          Delete
        </Button>
      </Accordion.Body>
    </Accordion.Item>
  );
};

export default Contact;
