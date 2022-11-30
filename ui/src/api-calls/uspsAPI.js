import axios from "axios";
import { convertXML } from "simple-xml-to-json";

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
      if (zipCodeData[0].Error) {
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