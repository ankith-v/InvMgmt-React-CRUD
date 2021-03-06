import React, { useState, useEffect } from "react";
import ItemDataService from "../services/ItemService";

const Item = (props) => {
  const initialItemState = {
    id: null,
    title: "",
    description: "",
    listed: false,
    count: "",
  };
  const [currentItem, setCurrentItem] = useState(initialItemState);
  const [message, setMessage] = useState("");

  const getItem = (id) => {
    ItemDataService.get(id)
      .then((response) => {
        setCurrentItem(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getItem(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentItem({ ...currentItem, [name]: value });
  };

  const updateListed = (status) => {
    var data = {
      id: currentItem.id,
      title: currentItem.title,
      description: currentItem.description,
      listed: status,
      count: currentItem.count,
    };

    ItemDataService.update(currentItem.id, data)
      .then((response) => {
        setCurrentItem({ ...currentItem, listed: status });
        console.log(response.data);
        setMessage("The status was updated successfully!");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const updateItem = () => {
    ItemDataService.update(currentItem.id, currentItem)
      .then((response) => {
        console.log(response.data);
        setMessage("The item was updated successfully!");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deleteItem = () => {
    ItemDataService.remove(currentItem.id)
      .then((response) => {
        console.log(response.data);
        props.history.push("/inventory");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentItem ? (
        <div className="edit-form">
          <h4>Item</h4>
          <form>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={currentItem.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                value={currentItem.description}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="count">Count</label>
              <input
                type="text"
                className="form-control"
                id="count"
                name="count"
                value={currentItem.count}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>
                <strong>Status:</strong>
              </label>
              {currentItem.listed ? "Listed" : "Unlisted"}
            </div>
          </form>

          {currentItem.listed ? (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updateListed(false)}
            >
              Unlist
            </button>
          ) : (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updateListed(true)}
            >
              List
            </button>
          )}

          <button className="badge badge-danger mr-2" onClick={deleteItem}>
            Delete
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateItem}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on an Item...</p>
        </div>
      )}
    </div>
  );
};

export default Item;
