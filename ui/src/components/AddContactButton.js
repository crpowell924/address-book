import { Accordion, Button } from "react-bootstrap";
import Contact from "./Contact";
import { useEffect, useState } from "react";
import { listAddresses } from "../api-calls/api";

const AddContactButton = ({ onClick }) => {
  return (
    <div className="d-grid gap-2">
        <Button variant="success" size="lg" onClick={onClick}>Add New Contact</Button>
    </div>
  );
};

export default AddContactButton;

