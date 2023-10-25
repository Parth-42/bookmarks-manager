import React from "react";
import { Breadcrumbs, Link } from "@material-ui/core";

const TagsComponent = () => {
  let tags: string[] = [];

  return (
    <div id="tagsContainer">
      <Breadcrumbs separator="," id="separator">
        {tags.map((tag) => (
          <Link id="tagLink">{"#" + tag}</Link>
        ))}
      </Breadcrumbs>
    </div>
  );
};
export default TagsComponent;
