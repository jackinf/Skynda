import React from "react";
import {bindActionCreators} from "redux";
import {About} from "../../../../src/routes/About/components/About.component";
import {shallow, mount} from "enzyme";

describe("(Component) Counter", () => {
  let _props, _spies, _wrapper;

  beforeEach(() => {
    _spies = {};
    _props = {
      people : [],
      description: 'blabla',
      ...bindActionCreators({
        loadDescription : (_spies.loadDescription = sinon.spy()),
        loadPeople   : (_spies.loadPeople = sinon.spy())
      }, _spies.dispatch = sinon.spy())
    };
    _wrapper = mount(<About {..._props} />);
  });

  it("Should render as a <div>.", () => {
    expect(_wrapper.is("About")).to.equal(true);
  });

  it("Should render with an <h2> that shows loading text", () => {
    expect(_wrapper.find("h2").text()).to.match(/Is loading/);
    _props.people.push({name: 'John', position: 'CEO'});
    _wrapper.update();
    //     console.log(_wrapper.debug());
    // expect(_wrapper.find("h2").text()).not.to.match(/Is loading/);
  });
});
