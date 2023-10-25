import { useEffect, useState, useMemo, useCallback } from "react";
import "./HomeScreen.scss";
import "font-awesome/css/font-awesome.min.css";
import { useDispatch, useSelector } from "react-redux";
import { Bookmark, BookmarkActionTypes } from "../../store/bookmark/types";
import { FolderActionTypes, IFolderState } from "../../store/folders/types";
import { TagsActionTypes } from "../../store/tags/types";
import { StoreState } from "../../store";
import AccessibilityTab from "../../Components/AccessibilityTab/AccessibilityTab";
import NavigationBar from "../../Components/NavigationBar/NavigationBar";
import QuickLink from "../../Components/QuickLink/QuickLink";
import SideNavigation from "../../Components/SideNavigation/SideNavigation";
import Bookmarks from "../../Components/Bookmarks/Bookmarks";
import Loader from "../../Components/Loader";

const HomeScreen = () => {
  const [toggleView, setToggleView] = useState(true);
  const [activeSideNavTabIndex, setActiveSideNavTabIndex] = useState(0);
  const [filteredBookmarks, setFilteredBookmarks] = useState<Bookmark[]>([]);
  const [selectedFolderId, setSelectedFolderId] = useState("");

  const [searchInput, setSearchInput] = useState("");

  const handleSearchBookmark = (input: string) => {
    setSearchInput(input);
    searchBookmarks(input);
  };

  const availableBookmarks = useSelector(
    (state: StoreState) => state.bookmark.availableBookmarks
  );

  const availableFolders = useSelector(
    (state: IFolderState) => state.folder.availableFolders
  );

  const isFolderDeleting = useSelector(
    (state: StoreState) => state.folder.isFolderDeleting
  );

  const isFolderEditing = useSelector(
    (state: StoreState) => state.folder.isFolderEditing
  );
  const isFolderAdding = useSelector(
    (state: StoreState) => state.folder.isFolderAdding
  );

  const bookmarkLoading = useSelector(
    (state: StoreState) => state.bookmark.bookmarkLoader
  );

  const selectedFolderHandler = (id: string) => {
    setSelectedFolderId(id);
  };

  const selectedBookmarks = useMemo(() => {
    return availableBookmarks.filter(
      (bookmark) => bookmark.isSelected === true
    );
  }, [availableBookmarks]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: BookmarkActionTypes.GET_ALL_BOOKMARKS,
    });
    dispatch({
      type: TagsActionTypes.GET_ALL_TAGS,
    });

    dispatch({ type: FolderActionTypes.GET_ALL_FOLDERS });
  }, [dispatch]);

  const handleFilteredBookmarkData = useCallback(() => {
    debugger;
    switch (activeSideNavTabIndex) {
      case 0: {
        setFilteredBookmarks([...availableBookmarks]);
        break;
      }
      case 1: {
        setFilteredBookmarks([]);
        break;
      }
      case 2: {
        setFilteredBookmarks(
          availableBookmarks.filter((bookmark) => bookmark.isFavourite === true)
        );
        break;
      }
    }
  }, [activeSideNavTabIndex, availableBookmarks]);

  useEffect(() => {
    handleFilteredBookmarkData();
  }, [handleFilteredBookmarkData]);

  const handleSelectedTabData = useCallback(
    (index: number) => {
      setActiveSideNavTabIndex(index);
      handleFilteredBookmarkData();
    },
    [handleFilteredBookmarkData]
  );

  const searchBookmarks = useCallback(
    (input: string) => {
      const arr = availableBookmarks.filter((bookmark) => {
        if (input === "") {
          return availableBookmarks;
        } else if (
          bookmark.imageLabel?.toLowerCase().includes(input.toLowerCase())
        ) {
          console.log(bookmark);
          return bookmark;
        }
        return null;
      });

      setFilteredBookmarks([...arr]);
    },
    [availableBookmarks]
  );

  useEffect(() => {
    searchBookmarks(searchInput);
  }, [availableBookmarks, searchBookmarks, searchInput]);
  const selectedFolder = useCallback(
    (id: string) => {
      if (id === "") {
        handleFilteredBookmarkData();
      } else {
        if (activeSideNavTabIndex === 2) {
          setFilteredBookmarks(
            availableBookmarks.filter(
              (bookmark) =>
                bookmark.folderId === id && bookmark.isFavourite === true
            )
          );
        } else {
          setFilteredBookmarks(
            availableBookmarks.filter((bookmark) => bookmark.folderId === id)
          );
        }
      }
    },
    [availableBookmarks, handleFilteredBookmarkData, activeSideNavTabIndex]
  );

  useEffect(() => {
    selectedFolder(selectedFolderId);
  }, [availableBookmarks, selectedFolderId, selectedFolder]);

  return (
    <div id="main-container">
      <NavigationBar />

      <div id="content">
        <SideNavigation
          selectedFolderId={selectedFolderId}
          selectedFolderHandler={selectedFolderHandler}
          availableFolders={availableFolders}
          handleActiveTab={handleSelectedTabData}
          activeSideNavTabIndex={activeSideNavTabIndex}
        />

        <div id="main-area">
          <div className="quick-link">
            <QuickLink availableFolders={availableFolders} />
          </div>

          <AccessibilityTab
            searchInput={searchInput}
            handleSearchBookmark={(input) => {
              handleSearchBookmark(input);
            }}
            selectedBookmarks={selectedBookmarks}
            toggleView={toggleView}
            setToggleView={setToggleView}
          />

          <Bookmarks
            filteredBookmarks={filteredBookmarks}
            toggleView={toggleView}
          />

          {(bookmarkLoading ||
            isFolderDeleting ||
            isFolderEditing ||
            isFolderAdding) && (
            <div id="loader">
              <Loader />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
