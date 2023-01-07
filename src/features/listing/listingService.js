import axios from "axios";
import Cookies from "universal-cookie";
import { setExpirationDate } from "../../assets/js/helpers";

const API_URL = "https://localhost:7092/listing/";
const headers = {
  "Content-Type": "application/json",
};

const getGenres = async () => {
  var config = {
    method: "get",
    url: API_URL + "get/genres",
    headers: headers,
  };

  var data = await axios(config)
    .then(function (response) {
      const cookies = new Cookies();
      cookies.set("genres", JSON.stringify(response.data), {
        path: "/",
        expires: setExpirationDate(15),
      });
      return response.data;
    })
    .catch(function (error) {
      return { data: error.response.data, status: error.response.status };
    });

  return data;
};

const listingService = {
  getGenres,
};

export default listingService;
