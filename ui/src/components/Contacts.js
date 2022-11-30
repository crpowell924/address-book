import { Accordion, Card } from "react-bootstrap";
import Contact from "./Contact";
import { deleteAddress } from "../api-calls/addressBookAPI";
import CardHeader from "react-bootstrap/esm/CardHeader";

const Contacts = ({addresses, setAddresses}) => {
  const deleteContact = (id) => {
    deleteAddress(id).then(() => {
        setAddresses(addresses.filter(addr => addr._id !== id));
    })
  }
  return (
    <div>
      {addresses?.length ? (
        <Accordion className="contacts">
          {addresses.map((address, index) => (
            <Contact address={address} index={index} key={index} handleDelete={deleteContact}/>
          ))}
        </Accordion>
      ) : (
        <Card className="text-center contacts"><CardHeader>No contacts to display! Click the button below to start.</CardHeader></Card>
      )}
    </div>
  );
};

export default Contacts;
