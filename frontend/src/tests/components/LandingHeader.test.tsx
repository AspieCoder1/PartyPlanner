import * as React from "react";
import * as renderer from "react-test-renderer";
import LandingHeader from "../../components/LandingHeader";

describe("Landing page component", () => {
  it("Should render component correctly", () => {
    const tree = renderer.create(<LandingHeader />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});