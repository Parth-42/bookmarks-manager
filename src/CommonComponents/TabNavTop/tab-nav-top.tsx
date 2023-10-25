import React from "react";
import {
  makeStyles,
  withStyles,
  Theme,
  createStyles
} from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";

const NavTabs = withStyles({
  indicator: {
    backgroundColor: "#6A8DE7",
    borderTopLeftRadius: '50px',
    borderTopRightRadius: '50px',
  }
})(Tabs);

const NavTab = withStyles((theme: Theme) =>
  createStyles({
    root: {
      textTransform: "none",
      minWidth: 72,
      fontWeight: theme.typography.fontWeightRegular,
      marginRight: theme.spacing(4),
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
        '"Segoe UI Symbol"'
      ].join(','),
      '&:not(:hover)': {
        opacity: 1,
      },
      "&$selected": {
        color: "#6A8DE7",
        fontWeight: theme.typography.fontWeightMedium,
        borderBottomLeftRadius: "20px",
        borderBottomRightRadius: "20px"
      },
      "&:not($selected)": {
        color: "black"
      },
      "&:focus": {
        color: "#6A8DE7"
      }
    },
    selected: {}
  })
)((props: StyledTabProps) => <Tab disableRipple {...props} />);

interface StyledTabProps {
  label: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1
  },
  padding: {
    padding: theme.spacing(3)
  },
  navbartop: {

  }
}));

interface TabNavTopInterface {
  onChangeHandler ?: (e:React.ChangeEvent<{}>) => void,
  className?: string,
  id?: string,
}

const TabNavTop:React.FC<TabNavTopInterface> = ({onChangeHandler, className, id}) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
      setValue(newValue);
      onChangeHandler && onChangeHandler(event);
  };

  return (
    <>
      <div className={classes.root}>
          <NavTabs centered value={value} onChange={handleChange} aria-label="ant example" className={className} id={id}>
            <NavTab label="Links"/>
            <NavTab label="Images" />
            <NavTab label="Text" />
          </NavTabs>
          <Typography  />
      </div>
    </>
  );
}
export default TabNavTop;
