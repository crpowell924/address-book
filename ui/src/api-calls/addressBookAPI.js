import axios from "axios";

// would normally use a .env or config file for environment-dependent URLs
const baseURL = "http://localhost:8080/addresses";

export const listAddresses = async () => {
  const response = await axios.get(baseURL).then((resp) => {
    return resp.data;
  }).catch(error => {
    console.error(error);
    return error;
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
