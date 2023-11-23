"use client";
import { UpdateIcon, Share2Icon, LayersIcon } from "@radix-ui/react-icons";

export const tools = [
  {
    id: 0,
    title: "Layers",
    icon: <LayersIcon />,
    component: "layerSection",
  },
  {
    id: 1,
    title: "Uploads",
    icon: <UpdateIcon />,
    component: "uploadSection",
  },
  {
    id: 2,
    title: "Share",
    icon: <Share2Icon />,
    component: "shareSection",
  },
];
