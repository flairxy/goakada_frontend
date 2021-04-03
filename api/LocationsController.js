import Repository from "./init";

const locations = "locations";
export default {
  getLocations() {
    return Repository.get(`${locations}`);
  },
  storeLocation(data) {
    return Repository.post(`${locations}/store`, data);
  },
};
