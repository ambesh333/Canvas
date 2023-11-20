import React from "react";
import { tools } from "../Data/tools";

// list of tools imported from /Data/tools.js

function ToolsBar(props) {
  return (
    <div className="flex  flex-row  w-full ">
      <div className="flex w-full">
        <div className="flex w-full flex-row">
          {tools.map((tool, i) => (
            <div
              className="toolsItem"
              key={i}
              onClick={() => {
                props.changeSelectedTool(i);
              }}
            >
              <div className="toolsItemContent">
                <span className="toolIcon">{tool.icon}</span>
                <span className="toolTitle">{tool.title}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ToolsBar;
