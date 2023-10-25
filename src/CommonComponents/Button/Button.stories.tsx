import Button from "./Button";

export default {
  title: "Button",
  component: Button,
};

const onClickHandler = () => {
  console.log("Button Clicked!");
};

export const Primary = () => (
  <Button variant="primary" onClickHandler={onClickHandler} disabled={false}>
    Save
  </Button>
);
export const Secondary = () => (
  <Button variant="secondary" onClickHandler={onClickHandler} disabled={false}>
    Done
  </Button>
);
