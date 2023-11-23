import React, { useState, useEffect } from "react";
import "./Styles/itemsList.css";
import { tools } from "../Data/tools";

import UploadSection from "./ItemsListComponents/UploadSection";
import ShareSection from "./ItemsListComponents/ShareSection";
import LayerSection from "./ItemsListComponents/LayerSection";
import ToolsBar from "./ToolsBar";

function ItemsList(props) {
  const [selectedTools, setSelectedTools] = useState(0);
  // componentsMap keys must be same with components key value in /Data/tools.js
  const componentsMap = {
    uploadSection: UploadSection,
    shareSection: ShareSection,
    layerSection: LayerSection,
  };
  const [sidebarCollapse, setSidebarCollapse] = useState(true);

  const changeSelectedTool = (id) => {
    setSelectedTools(id);
  };

  const handleCanvasResizeOnSidebarChange = () => {
    props.resizeCanvasOnSidebarChange();
  };

  // everytime when sidebar state changes function in Canvas.js is being called for resizing canvas dimensions
  useEffect(() => {
    handleCanvasResizeOnSidebarChange();
  }, [sidebarCollapse]);

  return (
    <div className="w-full h-full">
      {/* <div className="expandButton" onClick={() => openMenuOnClick()}>
        <CircleIcon />
      </div> */}
      <div
        className="flex-col h-full w-full"
        style={{ background: "var(--dark)" }}
      >
        <ToolsBar changeSelectedTool={changeSelectedTool} />

        {tools.map((val) => {
          if (val.id === selectedTools) {
            const Component = componentsMap[val.component];
            return (
              <Component
                key={val.id}
                onChangeDragUrl={props.onChangeDragUrl}
                handleAddOnClick={props.handleAddOnClick}
                dragUrl={props.dragUrl}
                addToBackground={props.addToBackground}
                removeBackground={props.removeBackground}
                stageRef={props.stageRef}
                groups={props.groups}
                setGroups={props.setGroups}
                setCurrentGroupId={props.setCurrentGroupId}
              />
            );
          }
        })}
      </div>
    </div>
  );
}

export default ItemsList;
