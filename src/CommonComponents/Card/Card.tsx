import React, { FC, useEffect } from "react";
import { useState, useMemo } from "react";
import "./Card.scss";
import "font-awesome/css/font-awesome.min.css";
import MoreVert from "@material-ui/icons/MoreVert";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import image from "../../assets/images/norway.jpg";
import { Bookmark } from "../../store/bookmark/types";
import OutsideClickHandler from "react-outside-click-handler";

interface CardProps {
  cardId: string;
  path: string;
  cardData: Bookmark;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onSelect?: (id: string) => void;
  onFav?: (id: string) => void;
  className?: string;
  id?: string;
}

const Card: FC<CardProps> = ({
  cardId,
  path,
  cardData,
  onEdit,
  onDelete,
  onSelect,
  onFav,
  className,
  id,
}) => {
  let folders = cardData.path!.split("/");

  const [cardSelected, setCardSelected] = useState(cardData.isSelected);
  const [favourite, setFavourite] = useState(cardData.isFavourite);
  const [displayMenu, setDisplayMenu] = useState(false);
  const [data, setData] = useState<Bookmark>(cardData);

  useEffect(() => {
    setData(cardData);
  }, [cardData]);

  useEffect(() => {
    setFavourite(cardData.isFavourite);
  }, [cardData.isFavourite]);

  const toggleCardSelect = () => {
    setCardSelected(!cardSelected);
    onSelect && onSelect(cardId);
  };

  const favouriteCard = () => {
    setFavourite(!favourite);
    onFav && onFav(cardId);
  };

  const toggleMenu = () => {
    setDisplayMenu(!displayMenu);
  };

  const editCard = () => {
    onEdit && onEdit(cardId);
    setDisplayMenu(false);
  };

  const deleteCard = () => {
    onDelete && onDelete(cardId);
    setDisplayMenu(false);
  };

  if (data.imageUrl === "") {
    setData({
      ...data,
      imageUrl: image,
      imageLabel: "Sample Title",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. At, voluptate!",
    });
  }

  const truncate = (str: string, n: number, useWordBoundary: number) => {
    if (str.length <= n) {
      return str;
    }
    const subString = str.substr(0, n - 1); // the original check
    return (
      (useWordBoundary
        ? subString.substr(0, subString.lastIndexOf(" "))
        : subString) + "..."
    );
  };

  const title: string = useMemo(() => {
    return truncate(data.imageLabel!, 20, 1);
  }, [data.imageLabel]);

  const description: string = useMemo(() => {
    return truncate(data.description!, 70, 1);
  }, [data.description]);

  return (
    <div
      className={`card-container ${
        cardSelected ? "boxSelected" : "boxDeselected"
      } ${className}`}
      id={id}
    >
      <div className="image">
        <a href={data.url} target="_blank" rel="noreferrer">
          <img src={data.imageUrl} alt=""></img>
        </a>
      </div>

      <div className="content">
        <div className="text">
          <a href={data.url} target="_blank" rel="noreferrer">
            <h3 className="title">{title}</h3>
          </a>
          <p className="description">{description}</p>
        </div>
        <div className="modify">
          <OutsideClickHandler onOutsideClick={() => setDisplayMenu(false)}>
            <i onClick={toggleMenu}>
              {" "}
              <MoreVert />{" "}
            </i>

            {displayMenu ? (
              <div className="buttonMenu">
                <button onClick={editCard}>Edit</button>
                <button onClick={deleteCard}>Delete</button>
              </div>
            ) : (
              ""
            )}
          </OutsideClickHandler>
        </div>

        <div className="folder-path">
          {folders.map((folder, index) => (
            <p className="path" key={index}>
              <i className="fa fa-folder"></i> {folder}{" "}
              {folders.length - 1 !== index && (
                <i
                  className="fa fa-chevron-right"
                  style={{ fontSize: "10px" }}
                ></i>
              )}
            </p>
          ))}
        </div>
      </div>

      <div id="favourite" onClick={favouriteCard}>
        <i
          className={`fa fa-heart ${favourite ? "favourite" : "notFavourite"}`}
        ></i>
      </div>

      <div className="select">
        <i className={cardSelected ? "selected" : "deselected"}>
          <CheckCircleIcon onClick={toggleCardSelect} fontSize="large" />
        </i>
      </div>
    </div>
  );
};

export default Card;
