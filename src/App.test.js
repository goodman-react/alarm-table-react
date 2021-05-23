import App from "./App";
import { render, RenderResult, findByTestId } from "@testing-library/react";
//import { cleanup, getByTestId, findByTestId } from "react-testing-library";
import { IntlProvider } from "react-intl";
import { CSVLink } from "react-csv";

describe("App", () => {
  it("should render", () => {
    render(
      <IntlProvider locale={"en"}>
        <App />
      </IntlProvider>
    );
  });
  it("rendering", function () {
    const renderedComponent = () => {
      render(
        <IntlProvider locale={"en"}>
          <App />
        </IntlProvider>
      );
    };
  });
});

describe("CSVLink", () => {
  it("historyList", function () {
    const historyList = [
      { device_mrid: "1", device_status: "xyz", status_updated_time: "12" },
      { device_mrid: "2", device_status: "123", status_updated_time: "13" }
    ];

    const { queryByTestId } = render(<CSVLink data={historyList} />);
    expect(() => queryByTestId("FormattedMessage")).not.toThrow();
  });
});
