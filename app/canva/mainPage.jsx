"use client";
import dynamic from "next/dynamic";
import { ThemeProvider } from "../../Components/theme-provider";

const Canvas = dynamic(() => import("../../Components/Canvas"), {
  ssr: false,
});

export default function Page(props) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <Canvas />
    </ThemeProvider>
  );
}
