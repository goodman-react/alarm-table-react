import handleErrorResponse from "./handleErrorResponse";
// import LoginActions from "./LoginActions";
import * as Cookies from "js-cookie";

const __API_URL__ = "http://localhost:4000/api";
// const __API_URL__ = "https://mockend.com/goodman-react/alarm-table-react";

export const readList = (path) => {
  const accessToken = localStorage.getItem("accessToken");
  Cookies.set("XSRF-TOKEN", Cookies.get("XSRF-TOKEN"));
  // var bodyParameters = {
  //   page: 1,
  //   pageSize: 50
  // };

  return fetch(`${__API_URL__}${path}`, {
    // credentials: "include",
    method: "get",
    // body: JSON.stringify(bodyParameters),
    headers: {
      Authorization: `JWT ${accessToken}`,
      "X-XSRF-TOKEN": Cookies.get("XSRF-TOKEN"),
      "cache-control": "no-cache",
      pragma: "no-cache"
    }
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.log(error.response);
      throw error;
    });
};

export const updateList = (path, data, id) => {
  const accessToken = localStorage.getItem("accessToken");
  Cookies.set("XSRF-TOKEN", Cookies.get("XSRF-TOKEN"));
  if (Array.isArray(id)) {
    id = id
      .map((decoded) => {
        return encodeURIComponent(decoded);
      })
      .join("/");
  } else {
    id = encodeURIComponent(id);
  }

  return fetch(`${__API_URL__}${path}`, {
    // credentials: "include",
    method: "put",
    body: JSON.stringify(data),
    headers: {
      Authorization: `JWT ${accessToken}`,
      "X-XSRF-TOKEN": Cookies.get("XSRF-TOKEN"),
      accept: "application/json",
      "content-type": "application/json"
    }
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.log(error.response);
      throw error;
    });
};
