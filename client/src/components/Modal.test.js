import React from "react";
import { create } from "react-test-renderer";
import Modal from "./Modal";

describe("Submenu component", () => {
  test("Matches the snapshot", () => {
    const modal = create(<Modal><div></div></Modal>);
    expect(modal.toJSON()).toMatchSnapshot();
  });
});

