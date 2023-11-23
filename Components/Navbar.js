"use client";

import React from "react";
import { Pencil1Icon } from "@radix-ui/react-icons";
import { ArrowTopLeftIcon } from "@radix-ui/react-icons";
import { ArrowTopRightIcon } from "@radix-ui/react-icons";
import { EraserIcon } from "@radix-ui/react-icons";
import { SquareIcon } from "@radix-ui/react-icons";
import { CircleIcon } from "@radix-ui/react-icons";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

import { CirclePicker } from "react-color";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

function Navbar({
  lines,
  setLines,
  drawing,
  setDrawing,
  setColor,
  history,
  historyStep,
  setMapMode,
  isPencilSelected,
  setIsPencilSelected,
  isEraserSelected,
  setIsEraserSelected,
  handleRedo,
  handleUndo,
  setRectangle,
  setTool,
  setCircle,
  setLineWidth,
  lineWidth,
}) {
  const ColorList = [
    "#D9E3F0",
    "#F47373",
    "#37D67A",
    "#2CCCE4",
    "#dce775",
    "#ff8a65",
  ];

  const handleColorChange = (value, event) => {
    setColor(value.hex);
  };

  return (
    <div className="flex items-center h-20 p-4">
      <div className="flex space-x-4 items-center">
        <Pencil1Icon
          className={`w-6 h-6 ${isPencilSelected ? "text-blue-500" : ""}`}
          onClick={() => {
            setIsPencilSelected(!isPencilSelected);
            setIsEraserSelected(false);
            setTool("pen");
          }}
        />
        <div className="w-20">
          {/* Adjust the width based on your preference */}
          <Slider
            defaultValue={[lineWidth]}
            max={30}
            step={1}
            onValueChange={setLineWidth}
            className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
          />
        </div>
        <EraserIcon
          className={`w-6 h-6 ${isEraserSelected ? "text-blue-500" : ""}`}
          onClick={() => {
            setIsEraserSelected(!isEraserSelected);
            setIsPencilSelected(true);
            setTool("eraser");
          }}
        />
        <ArrowTopLeftIcon className="w-6 h-6" onClick={handleUndo} />
        <ArrowTopRightIcon className="w-6 h-6" onClick={handleRedo} />
        <SquareIcon className="w-6 h-6" onClick={setRectangle} />

        <CircleIcon className="w-8 h-8" onClick={setCircle} />
        <div className="flex">
          <CirclePicker
            className="flex flex-col w-8 h-8"
            width="30px"
            circleSpacing={3}
            colors={ColorList}
            onChange={handleColorChange}
          />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
