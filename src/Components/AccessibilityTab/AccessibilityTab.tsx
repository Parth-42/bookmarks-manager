import React from "react";
import { BsFillHeartFill } from "react-icons/bs";
import { FaTrash } from "react-icons/fa";
import { FiMove, FiPlus } from "react-icons/fi";
import { HiOutlineFilter } from "react-icons/hi";
import { ImPriceTag } from "react-icons/im";
import { useDispatch } from "react-redux";
import TextInput from "../../CommonComponents/TextInput/TextInput";
import AddLink from "../../Components/AddLink";
import CreateTags from "../../Components/CreateTags";
import {
  addBookmarkToFavourite,
  deleteBookmark,
} from "../../store/bookmark/actions";
import { Bookmark } from "../../store/bookmark/types";
import { ModalActionTypes } from "../../store/modal/types";
import "./AccessibilityTab.scss";

interface AccessibilityProps {
  selectedBookmarks: Bookmark[];
  toggleView: boolean;
  setToggleView: React.Dispatch<React.SetStateAction<boolean>>;
  handleSearchBookmark: (input: string) => void;
  searchInput: string;
}

const Accessibility: React.FC<AccessibilityProps> = ({
  selectedBookmarks,
  toggleView,
  setToggleView,
  handleSearchBookmark,
  searchInput,
}) => {
  const dispatch = useDispatch();

  const setMultipleToFavourite = () => {
    selectedBookmarks.forEach((bookmark) => {
      dispatch(addBookmarkToFavourite(bookmark.id));
    });
  };

  const deleteSelectedBookmarks = () => {
    selectedBookmarks.forEach((bookmark) => {
      dispatch(deleteBookmark(bookmark.id));
    });
  };

  return (
    <div id="accessibility">
      <div id="search">
        <TextInput
          variant="secondary"
          search={true}
          className="search-component"
          placeholder="Bookmark title"
          value={searchInput}
          onValueChange={handleSearchBookmark}
        ></TextInput>
        <div className="filterIcon">
          <HiOutlineFilter />
        </div>
      </div>

      {selectedBookmarks.length > 0 ? (
        <div className="bookmark-buttons">
          <button
            onClick={() => {
              dispatch({
                type: ModalActionTypes.SHOW_MODAL,
                payload: {
                  title: "Add Tags",
                  component: CreateTags,
                },
              });
            }}
          >
            <ImPriceTag />
          </button>
          <button onClick={setMultipleToFavourite}>
            <BsFillHeartFill />
          </button>
          <button>
            <FiMove />
          </button>
          <button onClick={deleteSelectedBookmarks}>
            <FaTrash />
          </button>
        </div>
      ) : (
        ""
      )}

      <div id="buttons">
        <button
          id="add-link"
          onClick={() => {
            dispatch({
              type: ModalActionTypes.SHOW_MODAL,
              payload: {
                component: AddLink,
              },
            });
          }}
        >
          <span>
            <FiPlus />
          </span>
          Add Link
        </button>
        <div id="switch-button">
          <button
            className={`grid-view ${toggleView ? `active` : ``}`}
            onClick={() => setToggleView(true)}
          >
            <i className="fa fa-th-large"></i>
          </button>
          <button
            className={`list-view ${toggleView ? `` : `active`}`}
            onClick={() => setToggleView(false)}
          >
            <i className="fa fa-list-ul"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Accessibility;
