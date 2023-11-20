import {
  ImageIcon,
  PaddingIcon,
  UpdateIcon,
  Share2Icon,
} from "@radix-ui/react-icons";

// below is list of components that appear in sidebar
// id - unique id
// title - title of tool
// icon - imported icon from material ui
// component - component string needed for conditional rendering in itemsList.js
export const tools = [
  {
    id: 0,
    title: "Uploads",
    icon: <UpdateIcon />,
    component: "uploadSection",
  },
  {
    id: 1,
    title: "Share",
    icon: <Share2Icon />,
    component: "shareSection",
  },
];