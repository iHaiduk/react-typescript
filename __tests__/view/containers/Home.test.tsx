import * as React from "react";
import renderer from "react-test-renderer";
import Home from "../../../view/containers/Home";

test("Home render test", () => {
    const component = renderer.create(<Home />);
    const home = component.toJSON();
    expect(home).toMatchSnapshot();
});
