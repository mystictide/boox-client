import axios from "axios";
import Cookies from "universal-cookie";
import { buildFilterURL, setExpirationDate } from "../../assets/js/helpers";

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

const uploadPhoto = async (reqData) => {
  var config = {
    method: "post",
    url: API_URL + "upload/photo",
    headers: {
      Authorization: "Bearer " + reqData.token,
      "Content-Type": "application/json",
    },
    data: JSON.stringify(reqData.entity),
  };

  var data = await axios(config)
    .then(function (response) {
      const cookies = new Cookies();
      var listing = cookies.get("listing");
      listing.Photos = response.data;
      return listing;
    })
    .catch(function (error) {
      console.log(error);
      return { data: error.response.data, status: error.response.status };
    });

  return data;
};

const manageListing = async (reqData) => {
  var config = {
    method: "post",
    url: API_URL + "manage",
    headers: {
      Authorization: "Bearer " + reqData.token,
      "Content-Type": "application/json",
    },
    data: JSON.stringify(reqData.entity),
  };

  var data = await axios(config)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
      return { data: error.response.data, status: error.response.status };
    });

  return data;
};

const deleteListing = async (reqData) => {
  var config = {
    method: "get",
    url: API_URL + "delete?ID=" + reqData.id,
    headers: {
      Authorization: "Bearer " + reqData.token,
      "Content-Type": "application/json",
    },
  };

  var data = await axios(config)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
      return { data: error.response.data, status: error.response.status };
    });

  return data;
};

const getListing = async (reqData) => {
  var config = {
    method: "get",
    url: API_URL + "get/listing?ID=" + reqData.id,
    headers: headers,
  };

  var data = await axios(config)
    .then(function (response) {
      const cookies = new Cookies();
      cookies.set("listing", JSON.stringify(response.data), {
        path: "/",
        expires: setExpirationDate(1),
      });
      return response.data;
    })
    .catch(function (error) {
      return { data: error.response.data, status: error.response.status };
    });

  return data;
};

const filteredListing = async (reqData) => {
  var config = {
    method: "get",
    url: API_URL + "filter/" + buildFilterURL(reqData),
    headers: {
      "Content-Type": "application/json",
    },
  };

  var data = await axios(config)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return { data: error.response.data, status: error.response.status };
    });
  return data;
};

const filteredSelfListing = async (reqData) => {
  var config = {
    method: "get",
    url: API_URL + "filter/self" + buildFilterURL(reqData),
    headers: {
      Authorization: "Bearer " + reqData.token,
      "Content-Type": "application/json",
    },
  };

  var data = await axios(config)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return { data: error.response.data, status: error.response.status };
    });
  return data;
};

const listingService = {
  getGenres,
  uploadPhoto,
  manageListing,
  deleteListing,
  getListing,
  filteredListing,
  filteredSelfListing,
};

export default listingService;
