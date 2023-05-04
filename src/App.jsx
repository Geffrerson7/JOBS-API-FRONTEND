import "./App.css";
import AppRouter from "./router/AppRouter";
import ListHeader from "./components/ListHeader";

const App = () => {
  return (
    // <div className="app">
    //   <ListHeader listName={'💻Postulated Jobs list'}/>
    // </div>
    <AppRouter />
  )
}

export default App;
