import React, { FC } from "react";
import "./Button.scss";
import "./Button.stories";
interface ButtonProps {
  variant: string;
  onClickHandler: () => void;
  className?: string;
  id?: string;
  disabled?: boolean;
}
const Button: FC<ButtonProps> = ({
  variant,
  children,
  onClickHandler,
  className,
  id,
  disabled,
  ...rest
}) => {
  return (
    <div
      className={`btn-container ${className} ${disabled ? "disabled" : ""}`}
      id={id}
    >
      <button
        onClick={onClickHandler}
        className={`button ${variant} `}
        {...rest}
        disabled={disabled}
      >
        {children}
      </button>
    </div>
  );
};
export default Button;
