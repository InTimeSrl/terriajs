import React from "react";
import { act } from "react-dom/test-utils";
import TestRenderer from "react-test-renderer";
import Terria from "../../lib/Models/Terria";
import ViewState from "../../lib/ReactViewModels/ViewState";
import Tool from "../../lib/ReactViews/Tool";

const TestComponent = () => <div>Test hello</div>;

describe("Tool", function() {
  let viewState: ViewState;

  beforeEach(function() {
    const terria = new Terria();
    viewState = new ViewState({
      terria,
      catalogSearchProvider: undefined,
      locationSearchProviders: []
    });
  });

  it("renders the item returned by getToolComponent", async function() {
    let rendered: any;
    await act(async () => {
      rendered = TestRenderer.create(
        <Tool
          toolName="test-tool"
          viewState={viewState}
          getToolComponent={() => TestComponent as any}
        />
      );
    });
    const testComponent = rendered.root.findByType(TestComponent);
    expect(testComponent).toBeDefined();
  });

  it("renders the promised item returned by getToolComponent", async function() {
    let rendered: any;
    await act(async () => {
      rendered = TestRenderer.create(
        <Tool
          toolName="test-tool"
          viewState={viewState}
          getToolComponent={() => Promise.resolve(TestComponent as any)}
        />
      );
    });
    const testComponent = rendered.root.findByType(TestComponent);
    expect(testComponent).toBeDefined();
  });
});
