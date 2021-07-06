import React, { useState } from "react";
import ItemDataService from "../services/ItemService";

const AddItem = () => {
  const initialItemState = {
    id: null,
    title: "",
    description: "",
    published: false,
  };
  const [item, setItem] = useState(initialItemState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setItem({ ...item, [name]: value });
  };

  const saveItem = () => {
    if (item.title == "") {
      return;
    }
    var data = {
      title: item.title,
      description: item.description,
    };

    ItemDataService.create(data)
      .then((response) => {
        setItem({
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
          published: response.data.published,
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
          <div className="form-group">
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

          <div className="form-group">
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

          <button onClick={saveItem} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddItem;
