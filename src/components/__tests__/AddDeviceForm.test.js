import React from "react";
import renderer from "react-test-renderer";
import UpdateDeviceForm from "../UpdateDeviceForm";

it("renders correctly", () => {
  const tree = renderer.create(<UpdateDeviceForm />).toJSON();
  expect(tree).toMatchSnapshot();
});
