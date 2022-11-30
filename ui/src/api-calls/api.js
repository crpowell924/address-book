import axios from "axios";
import { convertXML } from "simple-xml-to-json";

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
  const response = await axios
    .get(`${url}${xml}`)
    .then((resp) => {
      const zipCodeData = convertXML(resp.data).CityStateLookupResponse
        .children[0].ZipCode.children;
      console.log(zipCodeData);
      if (zipCodeData[0].Error) {
        console.log("error thrown");
        throw Error("Invalid Zip Code");
      }
      let city = zipCodeData[1].City.content;
      let state = zipCodeData[2].State.content;
      city = city.charAt(0).toUpperCase() + city.slice(1).toLowerCase();
      return { city, state };
    })
    .catch((err) => {
      throw err;
    });
  return response;
};
