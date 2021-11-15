import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ArticleSearhBar from "./articleSearch";
import { debounce } from "lodash";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

const mockFunc = debounce(({}) => console.log(""));

const component = (
  <LocalizationProvider dateAdapter={AdapterDateFns}>
    <ArticleSearhBar debounceArticles={mockFunc} />
  </LocalizationProvider>
);

describe("<ArticleSearchBar />", () => {
  beforeAll(() => {
    // add window.matchMedia
    // this is necessary for the date picker to be rendered in desktop mode.
    // if this is not provided, the mobile mode is rendered, which might lead to unexpected behavior
    // source: https://github.com/mui-org/material-ui-pickers/issues/2073
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: (query: string): MediaQueryList => ({
        media: query,
        // this is the media query that @material-ui/pickers uses to determine if a device is a desktop device
        matches: query === "(pointer: fine)",
        onchange: () => {},
        addEventListener: () => {},
        removeEventListener: () => {},
        addListener: () => {},
        removeListener: () => {},
        dispatchEvent: () => false,
      }),
    });
  });

  afterAll(() => {
    //@ts-ignore
    delete window.matchMedia;
  });

  describe("field validations:", () => {
    test("from input: inputing invalid date should show a bad format message", async () => {
      render(component);
      userEvent.type(screen.getByLabelText(/from/i), "30303000", { delay: 1 });
      await waitFor(
        () =>
          expect(
            screen.getByText("Date format isn't valid")
          ).toBeInTheDocument(),
        { timeout: 1000 }
      );
    });

    test("from input: inputing vaild date should remove bad format message", () => {
      render(component);
      const datePick = screen.getByLabelText(/from/i);
      userEvent.type(datePick, "30303000");
      const error = screen.getByText("Date format isn't valid");
      userEvent.clear(screen.getByLabelText(/from/i));
      expect(error).not.toBeInTheDocument();
    });

    test("to input: inputing vaild date should remove bad format message", () => {
      render(component);
      const datePick = screen.getByLabelText(/to/i);
      userEvent.type(datePick, "30303000");
      const error = screen.getByText("Date format isn't valid");
      userEvent.clear(screen.getByLabelText(/to/i));
      expect(error).not.toBeInTheDocument();
    });


    test("to input: inputing invalid date should show a bad format message", async () => {
      render(component);
      userEvent.type(screen.getByLabelText(/to/i), "30303000", { delay: 1 });
      await waitFor(
        () =>
          expect(
            screen.getByText("Date format isn't valid")
          ).toBeInTheDocument(),
        { timeout: 1000 }
      );
    });

    test("inputing overlapping dates should show a date conflict message", async () => {
      render(component)
      const fromDate = await screen.findByLabelText(/from/i);
      const toDate = await screen.findByLabelText(/to/i);
      userEvent.type(fromDate, "10/11/2021");
      userEvent.type(toDate, "09/11/2021");

      expect(screen.getByText(/date conflicts with/i)).toBeInTheDocument();
    });

  });
});

