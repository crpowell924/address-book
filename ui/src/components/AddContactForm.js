import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { createAddress } from "../api-calls/api";

const AddContactForm = ({onSuccess}) => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address1: "",
    address2: "",
    zip: "",
  });
  const [error, setError] = useState("");
  
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const submitButton = (e) => {
    e.preventDefault();
    console.log(form);
    createAddress(form).then(resp => onSuccess(resp)).catch(err => setError(err.message));
  };

  return (
    <Form>
      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="name"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="First Last"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPhone">
        <Form.Label>Phone Number</Form.Label>
        <Form.Control
          type="phone"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="(123)456-7890"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="example@gmail.com"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicAddress">
        <Form.Label>Address</Form.Label>
        <br />
        <Form.Text>Line 1</Form.Text>
        <Form.Control
          type="address"
          name="address1"
          value={form.address1}
          onChange={handleChange}
        />
        <Form.Text>Line 2</Form.Text>
        <Form.Control
          type="address"
          name="address2"
          value={form.address2}
          onChange={handleChange}
        />
        <Form.Text>Zip Code</Form.Text>
        <Form.Control
          type="address"
          name="zip"
          value={form.zip}
          onChange={handleChange}
        />
      </Form.Group>
      <Button variant="primary" type="submit" onClick={submitButton}>
        Submit
      </Button>
      <Form.Text id="error-message">{error}</Form.Text>
    </Form>
  );
};
export default AddContactForm;
