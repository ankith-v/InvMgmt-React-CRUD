import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";
import { Switch, Route, Link } from "react-router-dom";
import AddItem from "./components/AddItem";
import Item from "./components/Item";
import ItemsList from "./components/ItemsList";
import "./App.css";

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/inventory" className="navbar-brand">
          Inventory
        </a>
        <div className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link to={"/inventory"} className="nav-link">
              Items
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/add"} className="nav-link">
              Add
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/inventory"]} component={ItemsList} />
          <Route exact path="/add" component={AddItem} />
          <Route exact path="/inventory/:id" component={Item} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
