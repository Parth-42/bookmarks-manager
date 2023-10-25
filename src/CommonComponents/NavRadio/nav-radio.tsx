import React from "react";

import "./nav-radio.css";

interface NavRadioInterface {
  title: string;
  onSelect?: () => void;
  checked?: boolean;
}

const NavRadio: React.FC<NavRadioInterface> = ({
  title,
  children,
  onSelect,
  checked,
}) => {
  const handleClick = () => {
    console.log("Clicked!!");
    onSelect && onSelect();
  };

  return (
    <>
      <div className="radio-toolbar">
        <input
          type="radio"
          id={title}
          name="radioNav"
          value={title}
          onClick={handleClick}
          defaultChecked={checked}
        />
        <label htmlFor={title}>{children}</label>
      </div>
    </>
  );
};
export default NavRadio;
