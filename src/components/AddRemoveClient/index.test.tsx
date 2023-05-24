import renderer from "react-test-renderer";
import { mock } from "../../mock/MockComponent";
import { AddRemoveClient } from "./AddRemoveClient";
import { clientMock } from "../../mock/addRemoveClient";

describe("Add remove client", () => {
  describe("renders", () => {
    it("should render add remove component", () => {
      const tree = renderer.create(<AddRemoveClient />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
