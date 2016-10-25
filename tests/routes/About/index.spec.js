import AboutRoute from "routes/About";

describe("(Route) Counter", () => {
  let _route;

  beforeEach(() => {
    _route = AboutRoute({});
  });

  it("Should return a route configuration object", () => {
    expect(typeof _route).to.equal("object");
  });

  it("Configuration should contain path `about`", () => {
    expect(_route.path).to.equal("about");
  });
});
