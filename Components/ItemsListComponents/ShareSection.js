"use client";

import React from "react";
import { DownloadIcon } from "@radix-ui/react-icons";

function ShareSection(props) {
  // function that creates hyperlink with canvas DataURL as href
  // programically clicks it to download the image
  // after download hyperlink is being removed from DOM
  const handleExport = () => {
    const uri = props.stageRef.current.toDataURL();
    const link = document.createElement("a");
    console.log(uri);
    console.log(link);
    link.download = "moodboard-export.png";
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full">
      <div className="shareSectionWrap">
        <button onClick={handleExport} className="downloadImage">
          <DownloadIcon />
          Export canvas as image
        </button>
      </div>
    </div>
  );
}

export default ShareSection;
