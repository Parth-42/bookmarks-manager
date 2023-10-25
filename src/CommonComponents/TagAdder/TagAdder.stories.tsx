import { useState } from "react";
import TagAdder from "./TagAdder";

export default {
  title: "Tag Adder",
  component: TagAdder,
};

type Tag = {
  id: number;
  label: string;
};

const tags = [
  {
    id: 1,
    label: "random",
  },
  {
    id: 2,
    label: "important",
  },
  {
    id: 3,
    label: "ignore",
  },
];

const onAdd = (tag: Tag) => {
  console.log(tag);
  return tag;
};

const onDelete = (tag: Tag) => {
  console.log(tag);
  return tag;
};

console.log(tags);

export const Primary = () => {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  console.log("Selected Tags:", selectedTags);

  const handleSelect = (tags: Tag[]) => {
    setSelectedTags(tags);
  };

  return (
    <TagAdder
      tagData={tags}
      onAdd={onAdd}
      onDelete={onDelete}
      selectedTags={selectedTags}
      onSelect={handleSelect}
    />
  );
};
