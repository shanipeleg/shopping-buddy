import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import CreateListForm from "./components/CreateListForm";
import ListPage from "./components/ListPage";
import Lists from "./components/Lists";
import NavBar from "./components/NavBar";
import { store } from "./store/configureStore";

function App() {
  store.subscribe(() => {});

  const routes = [
    { path: "/create-list", element: <CreateListForm /> },
    { path: "/lists", element: <Lists /> },
    { path: "/list/:id", element: <ListPage /> },
  ];

  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter basename="/">
          <div className="container">
            <NavBar />
            <Routes>
              {routes.map((route) => (
                <Route
                  key={route.path}
                  path={route.path}
                  element={route.element}
                />
              ))}
            </Routes>
          </div>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
