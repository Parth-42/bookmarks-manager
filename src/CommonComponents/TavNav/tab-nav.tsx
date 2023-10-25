import React from "react";
import {
  makeStyles,
  withStyles,
  Theme,
  createStyles,
} from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";

export const NavTabs = withStyles({
  root: {
    borderBottom: "1px solid white",
  },
  indicator: {
    backgroundColor: "#6A8DE7",
    borderTopLeftRadius: "50px",
    borderTopRightRadius: "50px",
  },
})(Tabs);

export const NavTab = withStyles((theme: Theme) =>
  createStyles({
    root: {
      textTransform: "none",
      minWidth: 72,
      borderBotto: "3px solid #6A9DE7",
      borderBottomLeftRadius: "10px",
      borderBottomRightRadius: "10px",
      fontWeight: theme.typography.fontWeightRegular,
      marginRight: theme.spacing(3),
      fontFamily: [
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(","),
      "&:not(:hover)": {
        opacity: 1,
      },
      "&$selected": {
        color: "#6A8DE7",
        fontWeight: theme.typography.fontWeightMedium,
      },
      "&:not($selected)": {
        color: "lightgray",
      },
      "&:focus": {
        color: "#6A8DE7",
      },
    },
    selected: {},
  })
)((props: TabProps) => <Tab disableRipple {...props} />);

interface TabProps {
  label: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
  },
  padding: {
    padding: theme.spacing(3),
  },
  navbartop: {},
}));

interface TabNavInterface {
  onChangeHandler?: (value: number) => void;
}

const TabNav: React.FC<TabNavInterface> = ({ onChangeHandler }) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
    onChangeHandler && onChangeHandler(newValue);
  };

  return (
    <>
      <div className={classes.root}>
        <NavTabs value={value} onChange={handleChange} aria-label="ant example">
          <NavTab label="Folders" />
          <NavTab label="Tags" />
        </NavTabs>
        <Typography />
      </div>
    </>
  );
};

export default TabNav;
