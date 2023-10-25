import React from "react";
import { Breadcrumbs, Link } from "@material-ui/core";
import { AiFillFolderOpen } from "react-icons/ai";
import { ChevronRight } from "@material-ui/icons";
import "./listview.scss";

interface FolderInterface {
  foldersPath: string;
}

const FolderBreadCrumb: React.FC<FolderInterface> = ({ foldersPath }) => {
  let foldersArr = foldersPath.split("/");

  return (
    <div>
      <Breadcrumbs
        separator={<ChevronRight id="chevronRight" />}
        id="separator"
      >
        {foldersArr.map((folder) => (
          <div>
            <AiFillFolderOpen id="folderOpen" />{" "}
            <Link id="folderLink">{folder}</Link>
          </div>
        ))}
      </Breadcrumbs>
    </div>
  );
};

export default FolderBreadCrumb;
