import LocationsController from "./LocationsController";

const repositories = {
  LocationsController,
  // other repositories ...
};

export const RepositoryFactory = {
  get: (name) => repositories[name],
};
