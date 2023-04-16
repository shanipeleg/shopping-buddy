import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import CreateListForm from "./components/pages/CreateList/CreateListForm";
import ListPage from "./components/pages/List/ListPage";
import Lists from "./components/pages/Lists/Lists";
import NavBar from "./components/NavBar";
import { store } from "./store/configureStore";
import {
  ThemeProvider,
  createTheme,
  SimplePaletteColorOptions,
} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import ItemPage from "./components/pages/Item/Item";

const colorPalette: SimplePaletteColorOptions = {
  main: "#6366F1",
  contrastText: "#6366F1",
};
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: colorPalette,
  },
});
function App() {
  store.subscribe(() => {});

  const routes = [
    { path: "/create-list", element: <CreateListForm /> },
    { path: "/lists", element: <Lists /> },
    { path: "/list/:id", element: <ListPage /> },
    { path: "/item/:id", element: <ItemPage /> },
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
