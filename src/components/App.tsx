import { useEffect } from "react";
import "./App.scss";
import { fetchClient } from "./../slice/clientSlice";
import { useDispatch } from "react-redux";
import { AddRemoveClient } from "../components/AddRemoveClient";

function App() {
  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(fetchClient());
  }, [dispatch]);

  return <AddRemoveClient />;
}

export default App;
