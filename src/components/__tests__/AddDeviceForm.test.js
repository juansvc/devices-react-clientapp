import React from "react";
import renderer from "react-test-renderer";
import AddDeviceForm from "../AddDeviceForm";

it("renders correctly", () => {
  const tree = renderer.create(<AddDeviceForm />).toJSON();
  expect(tree).toMatchSnapshot();
});
