import App from "./App";
import { render, screen, RenderResult, findByTestId } from "@testing-library/react";
//import { cleanup, getByTestId, findByTestId } from "react-testing-library";
import { IntlProvider } from "react-intl";
import { CSVLink } from "react-csv";
import { Provider } from 'react-redux';
import store from "./redux/store";
import { DataGrid } from "@material-ui/data-grid";

describe("App", () => {
  it("should render", () => {
    render(
      <IntlProvider locale={"en"}>
        <Provider store={store}>
          <App />
        </Provider>
      </IntlProvider>
    );
  });
  it("rendering", function () {
    const renderedComponent = () => {
      render(
        <IntlProvider locale={"en"}>
          <Provider store={store}>
            <App />
          </Provider>
        </IntlProvider>
      );
    };
  });
});

describe("CSVLink", () => {
  it("historyList", function () {
    const historyList = [
      { id: 1, severity: "Low", acknowledgeTime: "2021-05-24T16:38:44.469Z", closeTime: "2021-05-25T17:33:53.103Z", realTime: true },
      { id: 2, severity: "Low", acknowledgeTime: "2021-05-25T17:34:46.734Z", closeTime: null, realTime: true },
      { id: 3, severity: "Low", acknowledgeTime: null, closeTime: null, realTime: true }
    ];

    const { queryByTestId } = render(<CSVLink data={historyList} />);
    expect(() => queryByTestId("FormattedMessage")).not.toThrow();
  });
});

describe('App', () => {
  test('renders Datagrid', () => { 
    render(
      <IntlProvider locale={"en"}>
        <Provider store={store}>
          <App />
        </Provider>
      </IntlProvider>
    );
    screen.debug();
  });
});

describe('App', () => {
  test('renders App component', () => { 
    const historyList = [
      { id: 1, severity: "Low", acknowledgeTime: "2021-05-24T16:38:44.469Z", closeTime: "2021-05-25T17:33:53.103Z", realTime: true },
      { id: 2, severity: "Low", acknowledgeTime: "2021-05-25T17:34:46.734Z", closeTime: null, realTime: true },
      { id: 3, severity: "Low", acknowledgeTime: null, closeTime: null, realTime: true }
    ];
    let rows;
    rows = historyList.map((obj, index) => {
      return (rows = {
        id: obj.id,
        severity: obj.severity,
        acknowledgeTime: obj.acknowledgeTime,
        closeTime: obj.closeTime,
        realTime: obj.realTime
      });
    });
    render(
      <IntlProvider locale={"en"}>
        <Provider store={store}>
          <App>
          <DataGrid
          pageSize={50}
          rowsPerPageOptions={[50, 100, 150]}
          rows={rows}
          pagination={true}
          hideFooterSelectedRowCount={true}
        />
            </App>
        </Provider>
      </IntlProvider>
    );
    
    screen.debug();
  });
});

