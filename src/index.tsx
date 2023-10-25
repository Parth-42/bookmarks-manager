import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import Modal from "./CommonComponents/Modal/modal";
import Notifications from "./Components/Notifications";
import store from "./store";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      <Modal />
      <Notifications />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
