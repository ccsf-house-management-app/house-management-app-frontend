/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import http from "../http-common";

function getAll(path) {
  return http.get(`/${path}`);
}

function get(path, id) {
  return http.get(`/${path}/${id}`);
}
function create(path, data) {
  return http.post(`/${path}`, data);
}

function update(path, id, data) {
  return http.put(`/${path}/${id}`, data);
}

function remove(path, id) {
  return http.delete(`/${path}/${id}`);
}

function removeAll(path) {
  return http.delete(`/${path}`);
}
function findByProperty(path, propertyType, property) {
  return http.get(`/${path}?${propertyType}=${property}`);
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
