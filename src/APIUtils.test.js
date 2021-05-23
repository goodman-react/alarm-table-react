import * as React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AppUtils, { readList } from "./APIUtils";
beforeAll(() => jest.spyOn(window, "fetch"));
global.fetch = jest.fn().mockImplementation(() => Promise.resolve(jest.fn()));

test('clicking "confirm" submits', async () => {
  const test = readList("/test");
  render(<AppUtils />);
  window
    .fetch({
      ok: true,
      json: async () => ({ success: true })
    })
    .then(jest.fn());
  // userEvent.click(screen.getByRole('button', {name: /confirm/i}))
  expect(window.fetch).toHaveBeenCalledWith(
    "/test",
    expect.objectContaining({
      credentials: "include",
      method: "POST",
      body: JSON.stringify(test)
    })
  );
  expect(window.fetch).toHaveBeenCalledTimes(1);
  // expect(await screen.findByText(/success/i)).toBeInTheDocument()
});
