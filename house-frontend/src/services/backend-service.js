/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import http from "../http-common";

function getAll(path) {
  http.get(`/${path}`);
}

function get(path, id) {
  http.get(`/${path}/${id}`);
}
function create(path, data) {
  http.post(`/${path}`, data);
}

function update(path, id, data) {
  http.put(`/${path}/${id}`, data);
}

function remove(path, id) {
  http.delete(`/${path}/${id}`);
}

function removeAll(path) {
  http.delete(`/${path}`);
}
function findByProperty(path, propertyType, property) {
  http.get(`/${path}?${propertyType}=${property}`);
}

export default {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByProperty,
};
