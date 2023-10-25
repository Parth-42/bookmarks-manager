import React, { FC, useEffect, useState } from "react";
import "./TagAdder.scss";
import { ColoredTag } from "../TagColored/tag-colored";

type Tag = {
  id: number;
  label: string;
};

interface TagAdderProps {
  tagData: Tag[];
  onAdd: (tag: Tag) => Tag;
  onDelete: (tag: Tag) => Tag;
  selectedTags: Tag[];
  className?: string;
  onSelect: (tags: Tag[]) => void;
}

const TagAdder: FC<TagAdderProps> = ({
  tagData,
  onAdd,
  onDelete,
  selectedTags,
  className,
  onSelect,
}) => {
  const [tags, setTags] = useState<Tag[]>(tagData);
  const [input, setInput] = useState("");
  const [foundTag, setFoundTag] = useState(false);
  const [filteredTags, setFilteredTags] = useState<Tag[]>(tagData);
  const [show, setShow] = useState(false);

  useEffect(() => {
    setTags(tagData);
    setFilteredTags(tagData);
  }, [tagData]);

  const addTag = (id: number) => {
    tags.forEach((tag) => {
      if (tag.id === id) {
        onSelect([...selectedTags, tag]);
        const arr = [...tags];
        const index = arr.indexOf(tag);
        onAdd(tag);
        if (index !== -1) {
          arr.splice(index, 1);
          setTags([...arr]);
        }

        setInput("");
        setShow(!show);
      }
    });
  };

  const deleteTag = (id: number) => {
    selectedTags.forEach((tag) => {
      if (tag.id === id) {
        const arr = [...selectedTags];
        const index = arr.indexOf(tag);

        onDelete(tag);

        setTags([...tags, tag]);

        if (index !== -1) {
          arr.splice(index, 1);
          onSelect([...arr]);
        }
      }
    });
  };

  const createTag = (label: string) => {
    const tag = {
      label: label,
      id: Math.random(),
    };

    onSelect([...selectedTags, tag]);
    setInput("");

    onAdd(tag);
  };

  useEffect(() => {
    const isMatched = tags.some((tag) => {
      if (tag.label.toLowerCase() === input.toLowerCase()) {
        return true;
      } else {
        return false;
      }
    });
    setFoundTag(isMatched);

    const arr =
      input === ""
        ? [...tags]
        : tags.filter((tag) => {
            if (input !== "") {
              if (tag.label.toLowerCase().includes(input.toLowerCase())) {
                return tag;
              }
            }
          });
    setFilteredTags([...arr]);
  }, [input, tags]);

  console.log("show:", show);

  return (
    <div className={`tag-adder-container ${className}`}>
      <div className="tags-input">
        <ul>
          {selectedTags.map((selectedTag) => {
            return (
              <li key={selectedTag.id}>
                <ColoredTag
                  label={selectedTag.label}
                  tagColor="#C9F4FB"
                  deleteTag={deleteTag}
                  id={selectedTag.id}
                />
              </li>
            );
          })}
        </ul>

        <input
          type="text"
          id="search"
          autoComplete="false"
          value={input}
          onFocus={() => setShow(true)}
          onChange={(e) => setInput(e.target.value)}
        />
      </div>

      {show ? (
        <div id="suggestions">
          {input === ""
            ? ""
            : !foundTag && (
                <p
                  onFocus={() => setShow(true)}
                  className="newFolder"
                  onClick={() => createTag(input)}
                >
                  + {input}
                </p>
              )}

          {filteredTags.map((tag) => {
            return (
              <div className="folder">
                <p
                  key={tag.id}
                  onFocus={() => setShow(true)}
                  onClick={() => addTag(tag.id)}
                >
                  {tag.label}
                </p>
              </div>
            );
          })}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default TagAdder;
