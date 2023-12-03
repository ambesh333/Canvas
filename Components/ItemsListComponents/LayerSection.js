import React from "react";
import {
  ChevronDownIcon,
  PlusIcon,
  EyeNoneIcon,
  EyeOpenIcon,
} from "@radix-ui/react-icons";

import { Button } from "@/Components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/Components/ui/hover-card";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";

function LayerSection(props) {
  const { setGroups, setCurrentGroupId, groups } = props;
  const deleteGroup = (groupId) => {
    // Filter out the group with the specified id
    const updatedGroups = groups.filter((group) => group.id !== groupId);
    setGroups(updatedGroups);
    // Optionally, perform additional cleanup or actions after deleting the group
  };
  const toggleVisibility = (groupId) => {
    setGroups((prevGroups) =>
      prevGroups.map((group) =>
        group.id === groupId ? { ...group, visible: !group.visible } : group
      )
    );
  };
  const addNewGroup = () => {
    const newGroupId = groups.length;
    setGroups([...groups, { id: newGroupId, elements: [] }]);
    setCurrentGroupId(newGroupId);
  };

  return (
    <div className="w-full">
      <div className="shareSectionWrap">
        <div className="hidden flex-col space-y-4 sm:flex md:order-2">
          <div className="grid gap-2">
            <div className="flex-col w-full">
              {groups.map((group) => (
                <div className=" pt-5">
                  <div className="flex  ">
                    <Card>
                      <div className="w-full flex">
                        <div className="flex-col button p-3 ">
                          <Button onClick={addNewGroup}>
                            <PlusIcon />
                          </Button>
                        </div>
                        <div className="flex-col ">
                          <CardHeader>
                            <CardTitle> Layer {group.id + 1}</CardTitle>
                          </CardHeader>
                        </div>
                      </div>

                      <CardContent className="flex gap-6">
                        <div className="flex items-center justify-between space-x-4">
                          <Button
                            variant="outline"
                            className="bg-grey-500 "
                            onClick={() => toggleVisibility(group.id)}
                          >
                            <div className=" p-1">
                              {group.visible ? (
                                <EyeNoneIcon />
                              ) : (
                                <EyeOpenIcon />
                              )}
                            </div>
                            <div>{group.visible ? "Hide" : "Show"}</div>
                          </Button>
                          <Button
                            variant="outline"
                            className="bg-red-500"
                            onClick={() => deleteGroup(group.id)}
                          >
                            Delete
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LayerSection;
