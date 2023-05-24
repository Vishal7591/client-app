import "./App.scss";
import { Provider } from "react-redux";
import { store } from "./../store/configureStore";
import { AddRemoveClient } from "../components/AddRemoveClient";

function App() {
  return (
    <Provider store={store}>
      <AddRemoveClient />
    </Provider>
  );
}

export default App;
