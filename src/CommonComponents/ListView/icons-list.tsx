import React from "react";
import "./listview.scss";

import { FiTrash2, FiEdit3, FiHeart } from "react-icons/fi";
import { BiCopyAlt } from "react-icons/bi";

interface IconsInterface {
  onIconSelect?: () => void;
}

const IconsList: React.FC<IconsInterface> = ({ onIconSelect }) => {
  const handleIconClick = () => {
    console.log("icon clicked!");
    onIconSelect && onIconSelect();
  };

  return (
    <div>
      <FiHeart className="icons" onClick={handleIconClick} />
      <BiCopyAlt className="icons" onClick={handleIconClick} />
      <FiEdit3 className="icons" onClick={handleIconClick} />
      <FiTrash2 className="icons" onClick={handleIconClick} />
    </div>
  );
};

export default IconsList;
