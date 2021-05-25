import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import { IntlProvider } from "react-intl";

import App from "./App";

const rootElement = document.getElementById("root");
ReactDOM.render(
    <IntlProvider locale="en">
      <Provider store={store}>
        <App />
      </Provider>
    </IntlProvider>,
  rootElement
);
