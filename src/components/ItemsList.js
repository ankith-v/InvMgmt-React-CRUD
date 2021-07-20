import React, { useState, useEffect, useMemo, useRef } from "react";
import ItemDataService from "../services/ItemService";
import { useTable } from "react-table";

const ItemsList = (props) => {
  const [item, setItems] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const itemsRef = useRef();

  itemsRef.current = item;

  useEffect(() => {
    retrieveItems();
  }, []);

  const onChangeSearchTitle = (e) => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const retrieveItems = () => {
    ItemDataService.getAll()
      .then((response) => {
        if (response.data === "") {
          response.data = [];
        }
        setItems(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveItems();
  };

  const removeAllItems = () => {
    ItemDataService.removeAll()
      .then((response) => {
        console.log(response.data);
        refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const findByTitle = () => {
    ItemDataService.findByTitle(searchTitle)
      .then((response) => {
        if (response.data === "") {
          response.data = [];
        }
        setItems(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const openItem = (rowIndex) => {
    const id = itemsRef.current[rowIndex].id;

    props.history.push("/inventory/" + id);
  };

  const deleteItem = (rowIndex) => {
    const id = itemsRef.current[rowIndex].id;

    ItemDataService.remove(id)
      .then((response) => {
        props.history.push("/inventory");

        let newItems = [...itemsRef.current];
        newItems.splice(rowIndex, 1);

        setItems(newItems);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const columns = useMemo(
    () => [
      {
        Header: "Title",
        accessor: "title",
      },
      {
        Header: "Description",
        accessor: "description",
      },
      {
        Header: "Count",
        accessor: "count",
      },
      {
        Header: "Status",
        accessor: "listed",
        Cell: (props) => {
          return props.value ? "Listed" : "Unlisted";
        },
      },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: (props) => {
          const rowIdx = props.row.id;
          return (
            <div>
              <span onClick={() => openItem(rowIdx)}>
                <i className="far fa-edit action mr-2"></i>
              </span>

              <span onClick={() => deleteItem(rowIdx)}>
                <i className="fas fa-trash action"></i>
              </span>
            </div>
          );
        },
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data: item,
    });

  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by title"
            value={searchTitle}
            onChange={onChangeSearchTitle}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByTitle}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-12 list">
        <table
          className="table table-striped table-bordered"
          {...getTableProps()}
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="col-md-8">
        <button className="btn btn-sm btn-danger" onClick={removeAllItems}>
          Remove All
        </button>
      </div>
    </div>
  );
};

export default ItemsList;
