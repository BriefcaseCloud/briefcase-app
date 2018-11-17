import axios from "axios";

export default () => {
  return axios.create({
    baseURL:
      process.env.NODE_ENV === "production"
        ? "https://briefcase.cloud/api"
        : `http://localhost:8080`
  });
};
