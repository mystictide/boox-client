import axios from "axios";
import Cookies from "universal-cookie";
import { setExpirationDate } from "../../assets/js/helpers";

const API_URL = "https://localhost:7092/auth/";
const API_URL_Users = "https://localhost:7092/user/";
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
      const cookies = new Cookies();
      cookies.set("user", JSON.stringify(response.data), {
        path: "/",
        expires: setExpirationDate(13),
      });
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
      const cookies = new Cookies();
      cookies.set("user", JSON.stringify(response.data), {
        path: "/",
        expires: setExpirationDate(13),
      });
      return response.data;
    })
    .catch(function (error) {
      return { data: error.response.data, status: error.response.status };
    });

  return data;
};

const logout = async () => {
  const cookies = new Cookies();
  cookies.remove("user");
};

const changePassword = async (reqData) => {
  var config = {
    method: "get",
    url:
      API_URL_Users +
      `change/password?currentPassword=${reqData.currentPassword}&newPassword=${reqData.newPassword}`,
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

const updateEmail = async (reqData) => {
  var config = {
    method: "get",
    url: API_URL_Users + `update/email?email=${reqData.email}`,
    headers: {
      Authorization: "Bearer " + reqData.token,
      "Content-Type": "application/json",
    },
  };

  var data = await axios(config)
    .then(function (response) {
      const cookies = new Cookies();
      var user = cookies.get("user");
      user.Email = reqData.email;
      cookies.set("user", JSON.stringify(user), {
        path: "/",
        expires: setExpirationDate(13),
      });
      return response.data;
    })
    .catch(function (error) {
      return { data: error.response.data, status: error.response.status };
    });

  return data;
};

const manageAddress = async (reqData) => {
  var config = {
    method: "post",
    url: API_URL_Users + "manage/addresses",
    headers: {
      Authorization: "Bearer " + reqData.token,
      "Content-Type": "application/json",
    },
    data: JSON.stringify(reqData.entity),
  };

  var data = await axios(config)
    .then(function (response) {
      const cookies = new Cookies();
      var user = cookies.get("user");
      user.Addresses = response.data;
      cookies.set("user", JSON.stringify(user), {
        path: "/",
        expires: setExpirationDate(13),
      });
      return response.data;
    })
    .catch(function (error) {
      return { data: error.response.data, status: error.response.status };
    });

  return data;
};

const deleteAddress = async (reqData) => {
  var config = {
    method: "get",
    url: API_URL_Users + "delete/address?ID=" + reqData.id,
    headers: {
      Authorization: "Bearer " + reqData.token,
      "Content-Type": "application/json",
    },
  };

  var data = await axios(config)
    .then(function (response) {
      const cookies = new Cookies();
      var user = cookies.get("user");
      user.Addresses = response.data;
      cookies.set("user", JSON.stringify(user), {
        path: "/",
        expires: setExpirationDate(13),
      });
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
      return { data: error.response.data, status: error.response.status };
    });

  return data;
};

const authService = {
  register,
  login,
  logout,
  changePassword,
  updateEmail,
  manageAddress,
  deleteAddress,
};

export default authService;
