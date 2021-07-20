import React, { useState } from "react";
import ItemDataService from "../services/ItemService";

const AddItem = () => {
  const initialItemState = {
    id: null,
    title: "",
    description: "",
    listed: false,
    count: "",
  };
  const [item, setItem] = useState(initialItemState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setItem({ ...item, [name]: value });
  };

  const saveItem = () => {
    if (item.title === "") {
      return;
    }
    var data = {
      title: item.title,
      description: item.description,
      count: item.count,
    };

    ItemDataService.create(data)
      .then((response) => {
        setItem({
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
          listed: response.data.listed,
          count: response.data.count,
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const newItem = () => {
    setItem(initialItemState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newItem}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div style={{marginTop: "3%"}} className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              required
              value={item.title}
              onChange={handleInputChange}
              name="title"
            />
          </div>

          <div style={{marginTop: "3%"}} className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              required
              value={item.description}
              onChange={handleInputChange}
              name="description"
            />
          </div>

          <div style={{marginTop: "3%"}} className="form-group">
            <label htmlFor="description">Count</label>
            <input
              type="text"
              className="form-control"
              id="count"
              required
              value={item.count}
              onChange={handleInputChange}
              name="count"
            />
          </div>

          <button style={{backgroundColor: "darkgreen",marginTop: "10%"}} onClick={saveItem} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddItem;
