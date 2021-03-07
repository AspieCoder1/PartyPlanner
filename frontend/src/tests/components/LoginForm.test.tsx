import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LoginForm } from "../../components/LoginForm";

describe("LoginForm component", () => {
  it("Should display error if email and password not provided", async () => {
    const closeModel = jest.fn();
    render(<LoginForm closeModal={closeModel} />);

    fireEvent.click(screen.getByTestId("submitButton"));

    await waitFor(() => {
      expect(screen.getAllByText("Required").length).toBe(2);
    });
  });

  it("Should display error if email is invalid", async () => {
    const closeModel = jest.fn();
    render(<LoginForm closeModal={closeModel} />);

    userEvent.type(screen.getByPlaceholderText("e-mail"), "test");
    fireEvent.click(screen.getByTestId("submitButton"));

    await waitFor(() => {
      expect(screen.getAllByText("Required").length).toBe(1);
      expect(screen.getByText("Invalid email")).toBeTruthy();
    });
  });

  it("Should display no errors if both inputs are valid", async () => {
    const closeModel = jest.fn();
    const { container } = render(<LoginForm closeModal={closeModel} />);

    userEvent.type(screen.getByPlaceholderText("e-mail"), "test@test.com");
    userEvent.type(screen.getByPlaceholderText("password"), "2133qrerefdwf");
    fireEvent.click(screen.getByTestId("submitButton"));

    await waitFor(() => {
      expect(container.querySelector("#emailError")).toBeNull();
      expect(container.querySelector("#passwordError")).toBeNull();
    });
  });

  it("Should run close modal when close modal is clicked", () => {
    const closeModel = jest.fn();
    render(<LoginForm closeModal={closeModel} />);

    fireEvent.click(screen.getByText("\u00D7"));
    expect(closeModel).toHaveBeenCalledTimes(1);
  })
});
