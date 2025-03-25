import { render } from "@testing-library/react";

import App from "./index.tsx";

test("Renders the main page", () => {
  render(<App />);
  expect(true).toBeTruthy();
});
