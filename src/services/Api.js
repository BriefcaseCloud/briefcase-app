import axios from "axios";

export default () => {
  return axios.create({
    baseURL:
      process.env.NODE_ENV === "production"
        ? "https://us-central1-briefcase-cloud.cloudfunctions.net/api"
        : `http://localhost:5000/briefcase-cloud/us-central1/api`
  });
    //     baseURL: 'http://localhost:5000/briefcase-cloud/us-central1/api'
    // });

};
