import { Grid, Checkbox } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import React,{useEffect, useState} from "react";
import TagsComponent from "./TagsComponent";
import FolderBreadCrumb from "./BreadCrumb";
import CardComponent from "./CardComponent";
import { RadioButtonUnchecked, CheckCircle } from "@material-ui/icons";
import { BiCopyAlt } from "react-icons/bi";
import { FiHeart, FiEdit3, FiTrash2 } from "react-icons/fi";
import "./listview.scss";
import { Bookmark } from "../../store/bookmark/types";


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      border: "1px solid whitesmoke",
      borderRadius: "9px",
      marginTop: "10px",
      backgroundColor: "white"
    },
    paper: {
      maxWidth: "auto",
      width: "auto",
      height: "100px",
    },
    icons: {
      "&:hover": {
        backgroundColor: "#FFF",
      },
      "&:focus": {
        backgroundColor: "#FFF",
      },
    },
  })
);

interface ListViewInterface {
  foldersPath: string;
  tags?: string;
  changeHandler?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onCopy?: () => void;
  onFavourite?: (id: string) => void;
  cardData: Bookmark
}

const ListView: React.FC<ListViewInterface> = ({
  foldersPath,
  changeHandler,
  onEdit,
  onDelete,
  onCopy,
  onFavourite,
  cardData
}) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const classes = useStyles();

const [favourite, setFavourite] = useState(cardData.isFavourite)
const [selected, setSelected] = useState(cardData.isSelected)

useEffect(() => {
  setFavourite(cardData.isFavourite)
}, [cardData.isFavourite])

  const handleChange = () => {
    console.log("Change detected !");
    setSelected(!selected)
    changeHandler && changeHandler(cardData.id);
  };

  const handleEdit = () => {
    console.log("Clicked Edit Icon");
    onEdit && onEdit(cardData.id);
  };

  const handleDelete = () => {
    console.log("Clicked Delete Icon");
    onDelete && onDelete(cardData.id);
  };

  const handleFavourite = () => {
    console.log("Clicked Favourite Icon");
    setFavourite(!favourite)
    onFavourite && onFavourite(cardData.id);
  };

  const handleCopy = () => {
    console.log("Clicked Copy Icon");
    onCopy && onCopy();
  };

  return (
    <div className="card-list-container">
      <div className={classes.root}>
        <Grid container>
          <Grid container item xs={1} id="gridContainer">
            <Checkbox
              disableRipple={true}
              className={classes.icons}
              style={{ backgroundColor: "white" }}
              icon={
                <RadioButtonUnchecked
                  fontSize="small"
                  className={classes.icons}
                />
              }

              checked={selected}

              checkedIcon={
                <CheckCircle id="checkedCircle" className={classes.icons} />
              }
              onChange={handleChange}
            />
          </Grid>
          <Grid container item xs={3}>
            <CardComponent cardData={cardData} />
          </Grid>
          <Grid container item xs={3} id="gridItems">
            <div>
              <FolderBreadCrumb foldersPath={foldersPath} />
            </div>
          </Grid>
          <Grid container item xs={2} id="gridItems">
            <div>
              <TagsComponent />
            </div>
          </Grid>
          <Grid container item xs={2} id="gridItems">
            <div>
              <FiHeart className={`icons ${favourite ? "favourite" : "notFavourite"}`} onClick={handleFavourite} />
              <BiCopyAlt className="icons" onClick={handleCopy} />
              <FiEdit3 className="icons" onClick={handleEdit} />
              <FiTrash2 className="icons" onClick={handleDelete} />
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default ListView;
