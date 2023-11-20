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
              className="flex-row w-24 items-center justify-center m-2 cursor-pointer"
              key={i}
              onClick={() => {
                props.changeSelectedTool(i);
              }}
            >
              <div className="toolsItemContent" style={{}}>
                <span className="w-24px h-24px">{tool.icon}</span>
                <span className="text-5">{tool.title}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ToolsBar;
