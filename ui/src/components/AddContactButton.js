import { Button } from "react-bootstrap";

const AddContactButton = ({ onClick }) => {
  return (
    <div className="d-grid gap-2">
        <Button variant="success" size="lg" onClick={onClick}>Add New Contact</Button>
    </div>
  );
};

export default AddContactButton;

