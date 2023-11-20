"use client";
import dynamic from "next/dynamic";

const Canvas = dynamic(() => import("../../Components/Canvas"), {
  ssr: false,
});

export default function Page(props) {
  return (
    <div className="bodyWrap">
      <Canvas />
    </div>
  );
}
