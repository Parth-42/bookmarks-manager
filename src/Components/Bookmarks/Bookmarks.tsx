import React from "react";
import ListView from "../../CommonComponents/ListView/ListView";
import EditLink from "../../Components/EditLink";
import { Bookmark } from "../../store/bookmark/types";
import { ModalActionTypes } from "../../store/modal/types";
import Card from "../../CommonComponents/Card/Card";
import { useDispatch } from "react-redux";
import {
  addBookmarkToFavourite,
  deleteBookmark,
  selectBookmark,
} from "../../store/bookmark/actions";
import "./Bookmarks.scss";

interface BookmarksProps {
  filteredBookmarks: Bookmark[];
  toggleView: boolean;
}

const Bookmarks: React.FC<BookmarksProps> = ({
  filteredBookmarks,
  toggleView,
}) => {
  const dispatch = useDispatch();

  const onSelect = (id: string) => {
    dispatch(selectBookmark(id));
  };

  const onFavourite = (id: string) => {
    dispatch(addBookmarkToFavourite(id));
  };

  const onDeleteBookmark = (id: string) => {
    dispatch(deleteBookmark(id));
  };

  return (
    <div id="bookmarks">
      {filteredBookmarks.length === 0 ? (
        <div id="not-found">
          <i className="fa fa-folder-open"></i>
          <h3>No Bookmarks Found</h3>
          <p>
            Keep content organized with <br /> folders &amp; subfolders.
          </p>
        </div>
      ) : toggleView ? (
        filteredBookmarks.map((data) => {
          return (
            <Card
              key={data.id}
              cardId={data.id}
              cardData={data}
              path={data.path!}
              className="card"
              onEdit={(id) => {
                dispatch({
                  type: ModalActionTypes.SHOW_MODAL,
                  payload: {
                    component: EditLink,
                    data: {
                      id,
                    },
                  },
                });
              }}
              onSelect={(id) => onSelect(id)}
              onFav={(id) => onFavourite(id)}
              onDelete={(id) => onDeleteBookmark(id)}
            />
          );
        })
      ) : (
        filteredBookmarks.map((data) => {
          return (
            <ListView
              key={data.id}
              foldersPath={data.path!}
              changeHandler={(id) => onSelect(id)}
              onCopy={() => {}}
              onEdit={(id) => {
                dispatch({
                  type: ModalActionTypes.SHOW_MODAL,
                  payload: {
                    component: EditLink,
                    data: {
                      id,
                    },
                  },
                });
              }}
              onDelete={(id) => onDeleteBookmark(id)}
              onFavourite={(id) => {
                onFavourite(id);
              }}
              cardData={data}
            />
          );
        })
      )}
    </div>
  );
};

export default Bookmarks;
