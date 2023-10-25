import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { Avatar } from "@material-ui/core";
import { useMemo } from "react";
import { Bookmark } from "../../store/bookmark/types";

interface CardComponentInterface {
  cardData: Bookmark
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      overflow: "hidden",
      padding: theme.spacing(0, 3),
    },
    paper: {
      maxWidth: 400,
      margin: `${theme.spacing(1)}px auto`,
      padding: theme.spacing(2),
    },
  })
);

const CardComponent: React.FC<CardComponentInterface> = ({ cardData }) => {
  const classes = useStyles();

  // type Data = {
  //   description: string;
  //   image: string;
  //   title: string;
  //   url?: string;
  // };

  // const [data, setData] = useState<Data>({
  //   description: "",
  //   image: "",
  //   title: "",
  //   url: "",
  // });

  // console.log(data);

  function truncate(str: string, n: number, useWordBoundary: number) {
    if (str.length <= n) {
      return str;
    }
    const subString = str.substr(0, n - 1); // the original check
    return (
      (useWordBoundary
        ? subString.substr(0, subString.lastIndexOf(" "))
        : subString) + "..."
    );
  }

  const title: string = useMemo(() => {
    return truncate(cardData.imageLabel!, 30, 1);
  }, [cardData.imageLabel]);

  const description: string = useMemo(() => {
    return truncate(cardData.description!, 70, 1);
  }, [cardData.description]);

  return (
    <div className={classes.root}>
      <Paper elevation={0} className={classes.paper}>
        <Grid container wrap="nowrap" spacing={2}>
          <Grid item>
            <Avatar variant="square" id="avatar" src={cardData.imageUrl} />
          </Grid>
          <Grid item xs zeroMinWidth>
            <Typography variant="subtitle1" noWrap>
              {title}
            </Typography>
            <Typography id="description" variant="caption" noWrap>
              {description}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default CardComponent;
