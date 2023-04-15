import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import CreateListForm from "./components/CreateListPage/CreateListForm";
import ListPage from "./components/ListPage";
import Lists from "./components/Lists";
import NavBar from "./components/NavBar";
import { store } from "./store/configureStore";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});
function App() {
  store.subscribe(() => {});

  const routes = [
    { path: "/create-list", element: <CreateListForm /> },
    { path: "/lists", element: <Lists /> },
    { path: "/list/:id", element: <ListPage /> },
  ];

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div className="App bg-gray-900 text-white font-body">
        <Provider store={store}>
          <BrowserRouter basename="/">
            <div>
              <NavBar />
              <div className="container mx-auto mt-8 p-8 rounded-lg bg-gray-800 shadow-xl">
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
            </div>
          </BrowserRouter>
        </Provider>
      </div>
    </ThemeProvider>
  );
}

export default App;
