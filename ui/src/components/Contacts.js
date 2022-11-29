import { Accordion } from "react-bootstrap";
import Contact from "./Contact";
// import sample from '../sample-data.json';
import { useEffect, useState } from "react";
import { listAddresses } from "../api-calls/api";

const Contacts = () => {
  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    listAddresses()
      .then((res) => setAddresses(res))
      .catch((err) => console.log(err));
  }, []);

  return (
    <Accordion>
      {addresses.map((address, index) => (
        <Contact address={address} index={index} key={index} />
      ))}
    </Accordion>
  );
};

export default Contacts;
