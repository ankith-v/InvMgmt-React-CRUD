import http from "../http-common";

const getAll = () => {
  return http.get("/inventory");
};

const get = (id) => {
  return http.get(`/inventory/${id}`);
};

const create = (data) => {
  return http.post("/inventory", data);
};

const update = (id, data) => {
  return http.put(`/inventory/${id}`, data);
};

const remove = (id) => {
  return http.delete(`/inventory/${id}`);
};

const removeAll = () => {
  return http.delete(`/inventory`);
};

const findByTitle = (title) => {
  return http.get(`/inventory?title=${title}`);
};

const ItemService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByTitle,
};

export default ItemService;
