import React from "react";
import { DownloadIcon } from "@radix-ui/react-icons";

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
        <div className="flex-row">
          <div className=" flex button">
            <button onClick={addNewGroup}>
              <h1 className="bg-black"> Add Group </h1>
            </button>
          </div>
          <div className=" flex bg-red-500">
            <h2>Groups:</h2>
            <ul>
              {groups.map((group) => (
                <li key={group.id}>
                  Group {group.id + 1}
                  {/* Add any additional information you want to display */}
                  <button onClick={() => toggleVisibility(group.id)}>
                    {group.visible ? "Hide" : "Show"}
                  </button>
                  <button onClick={() => deleteGroup(group.id)}>Delete</button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LayerSection;
