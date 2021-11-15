import Articles from "./components/articles";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import type {} from "@mui/lab/themeAugmentation";
import "./App.css";

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div className="App">
        <Articles />
      </div>
    </LocalizationProvider>
  );
}

export default App;
