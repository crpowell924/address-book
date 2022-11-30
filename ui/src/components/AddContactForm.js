import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { cityStateLookup, createAddress } from "../api-calls/api";

const AddContactForm = ({ onSuccess }) => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address1: "",
    address2: "",
    cityState: "",
    zip: "",
  });
  const [error, setError] = useState("");
  const [validated, setValidated] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });

    if (e.target.name === "zip") {
      const zip = e.target.value.slice(0, 5);
      if (e.target.value.length === 5) {
        setError("");
        cityStateLookup(e.target.value)
          .then((resp) => {
            setForm({ ...form, cityState: `${resp.city}, ${resp.state}`, zip });
          })
          .catch((err) => {
            setError(err.message);
            setForm({ ...form, cityState: "--", zip });
          });
      } else {
        setForm({ ...form, cityState: "--", zip });
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (e.currentTarget.checkValidity() === false) {
        e.stopPropogation();
    }
    setValidated(true)
    createAddress(form)
      .then((resp) => onSuccess(resp))
      .catch((err) => setError(err.message));
  };

  return (
    <Form validated={validated} onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="name"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="First Last"
          required
        />
        <Form.Control.Feedback type="invalid">
          Please provide a name for the contact.
        </Form.Control.Feedback>
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
        <Form.Text>Optional</Form.Text>
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
        <Form.Text>Optional</Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicAddress">
        <Form.Label>Address</Form.Label>
        <br />
        <Form.Text>Street 1</Form.Text>
        <Form.Control
          type="address"
          name="address1"
          value={form.address1}
          onChange={handleChange}
          required
        />
        <Form.Control.Feedback type="invalid">
          Please provide a street address
        </Form.Control.Feedback>
        <Form.Text>Street 2</Form.Text>
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
          required
        />
        <Form.Control.Feedback type="invalid">
          Please provide a zip code.
        </Form.Control.Feedback>
        <Form.Text>City, State</Form.Text>
        <Form.Control
          type="address"
          name="cityState"
          value={form.cityState}
          disabled
        />
      </Form.Group>
      <Button variant="primary" type="submit" disabled={!!error}>
        Submit
      </Button>
      <Form.Text id="error-message">{error}</Form.Text>
    </Form>
  );
};
export default AddContactForm;
