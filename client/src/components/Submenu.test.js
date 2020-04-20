import React from "react";
import { create } from "react-test-renderer";
import Submenu from "./Submenu";

describe("Submenu component", () => {
  test("Matches the snapshot", () => {
    const submenu = create(<Submenu />);
    expect(submenu.toJSON()).toMatchSnapshot();
  });
});