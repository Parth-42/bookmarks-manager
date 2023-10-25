import React, { FC } from "react";
import "./TextInput.scss";
import "font-awesome/css/font-awesome.min.css";

interface TextInputProps {
  variant: string;
  search?: boolean;
  placeholder?: string;
  label?: string;
  onValueChange: (value: string) => void;
  value: string;
  className?: string;
  id?: string;
}

const TextInput: FC<TextInputProps> = ({
  variant = "primary",
  search,
  placeholder,
  label,
  value,
  onValueChange,
  className,
  id,
  ...rest
}) => {
  return (
    <div className={className} id={id}>
      <div className="text-input">
        {variant === "primary" ? <label>{label}</label> : ""}
        <input
          placeholder={placeholder}
          type="text"
          className={`textinput ${variant}`}
          onChange={(e) => onValueChange(e.target.value)}
          value={value}
          {...rest}
        />
        <span className="search-icon">
          {search ? <i className="fa fa-search"></i> : ""}
        </span>
      </div>
    </div>
  );
};

export default TextInput;
