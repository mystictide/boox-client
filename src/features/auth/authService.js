import axios from "axios";

const API_URL = "https://localhost:7109/auth/";
const headers = {
  "Content-Type": "application/json",
};

const register = async (userData) => {
  var config = {
    method: "post",
    url: API_URL + "register",
    headers: headers,
    data: JSON.stringify(userData),
  };

  var data = await axios(config)
    .then(function (response) {
      console.log(response.data)
      localStorage.setItem("user", JSON.stringify(response.data));
      return response.data;
    })
    .catch(function (error) {
      return { data: error.response.data, status: error.response.status };
    });

  return data;
};

const login = async (userData) => {
  var config = {
    method: "post",
    url: API_URL + "login",
    headers: headers,
    data: JSON.stringify(userData),
  };

  var data = await axios(config)
    .then(function (response) {
      localStorage.setItem("user", JSON.stringify(response.data));
      return response.data;
    })
    .catch(function (error) {
      return { data: error.response.data, status: error.response.status };
    });

  return data;
};

const logout = async () => {
  localStorage.removeItem("user");
};

const checkExistingUsername = async (userData) => {
  var config = {
    method: "post",
    url: API_URL + "cusername",
    headers: headers,
    data: JSON.stringify(userData),
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

const checkExistingMail = async (userData) => {
  var config = {
    method: "post",
    url: API_URL + "cmail",
    headers: headers,
    data: JSON.stringify(userData),
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

const authService = {
  register,
  login,
  logout,
  checkExistingMail,
  checkExistingUsername,
};

export default authService;
