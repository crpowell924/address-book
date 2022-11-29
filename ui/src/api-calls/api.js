import axios from "axios";
import {convertXML} from 'simple-xml-to-json';

const baseURL = "http://localhost:8080/addresses";

export const listAddresses = async () => {
  const response = await axios.get(baseURL).then((resp) => {
    console.log(resp.data);
    return resp.data;
  });
  return response;
};

export const createAddress = async (addressData) => {
  if (!addressData.name) {
    throw Error("Name is a required field.");
  }
  const response = await axios
    .post(baseURL, addressData)
    .then((resp) => {
      console.log(resp);
      return resp.data;
    })
    .catch((error) => {
      console.error(error);
      return error;
    });
  return response;
};

export const deleteAddress = async (id) => {
  const response = await axios
    .delete(`${baseURL}/${id}`)
    .then((resp) => {
      console.log(resp);
      return resp.data;
    })
    .catch((error) => {
      console.error(error);
      return error;
    });
  return response;
};

// todo: move this to it's own file
export const cityStateLookup = async (zip) => {
  const userId = "808NONE07305"; // registered with USPS for this ID
  const url =
    "http://production.shippingapis.com/ShippingAPITest.dll?API=CityStateLookup&XML=";

  const xml = `<CityStateLookupRequest USERID="${userId}"><ZipCode ID="0"><Zip5>${zip}</Zip5></ZipCode></CityStateLookupRequest>`;
  const response = await axios.get(`${url}${xml}`)
    .then((resp) => {
      const jsonData = convertXML(resp.data).CityStateLookupResponse;
      console.log(jsonData);
      return { 
        city: jsonData.children[0].ZipCode.children[1].City.content,
        state: jsonData.children[0].ZipCode.children[2].State.content
      };
    })
    .catch((err) => console.error(err));
    return response;
};
