import React, { useCallback, useMemo, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import FolderNavigation from "../../CommonComponents/FolderNavigation/FolderNavigation";
import NavRadio from "../../CommonComponents/NavRadio/nav-radio";
import TabNav from "../../CommonComponents/TavNav/tab-nav";
import TextInput from "../../CommonComponents/TextInput/TextInput";
import CreateFolder from "../../Components/CreateFolder";
import { deleteFolder, editFolder } from "../../store/folders/actions";
import {
  IRootFolders,
  FolderItem,
  IFolderState,
} from "../../store/folders/types";
import { ModalActionTypes } from "../../store/modal/types";
import { SIDENAV_TABS } from "../../utils/constants";
import "./SideNavigation.scss";

interface SideNavigationProps {
  availableFolders: FolderItem[];
  handleActiveTab: (tabIndex: number) => void;
  activeSideNavTabIndex: number;
  selectedFolderHandler: (id: string) => void;
  selectedFolderId: string;
}

const SideNavigation: React.FC<SideNavigationProps> = ({
  availableFolders,
  handleActiveTab,
  activeSideNavTabIndex,
  selectedFolderHandler,
  selectedFolderId,
}) => {
  const dispatch = useDispatch();
  const [activeNavTabIndex, setActiveNavTabIndex] = useState(0);

  const root = useSelector((state: IFolderState) => state.folder.root);
  const deleteSelectedFolder = (id: string) => {
    dispatch(deleteFolder(id));
  };

  const editSelectedFolder = (nodeData: { id: string; label: string }) => {
    const data = {
      label: nodeData.label,
      id: nodeData.id,
    };

    dispatch(editFolder(data));
  };

  const treeData = useMemo(() => {
    const tree: {
      root: IRootFolders;
      folders: { [key: string]: FolderItem };
    } = {
      root: {},
      folders: {},
    };

    availableFolders.forEach((element: any) => {
      tree.folders[element.id] = element;
    });

    tree.root = { ...root };

    return tree;
  }, [availableFolders, root]);

  const handleSideTabNavSelect = useCallback(
    (index: number) => {
      handleActiveTab(index);
    },
    [handleActiveTab]
  );

  const getFolderBookmarks = (id: string) => {
    if (id === selectedFolderId) {
      selectedFolderHandler("");
    } else {
      selectedFolderHandler(id);
    }
  };

  return (
    <div id="side-nav">
      <div id="directory-switch">
        <NavRadio
          title="All Projects"
          checked={activeSideNavTabIndex === 0}
          onSelect={() => handleSideTabNavSelect(0)}
        >
          {SIDENAV_TABS.ALL_PROJECTS}
        </NavRadio>
        <NavRadio
          title="Root"
          checked={activeSideNavTabIndex === 1}
          onSelect={() => handleSideTabNavSelect(1)}
        >
          {SIDENAV_TABS.ROOT}
        </NavRadio>
        <NavRadio
          title="Favourites"
          checked={activeSideNavTabIndex === 2}
          onSelect={() => {
            handleSideTabNavSelect(2);
          }}
        >
          {SIDENAV_TABS.FAVOURITES}
        </NavRadio>
      </div>
      <div id="seperator"></div>
      <div id="tab-nav">
        <TabNav
          onChangeHandler={(value) => {
            setActiveNavTabIndex(value);
          }}
        />
      </div>

      <div id="search-tags">
        <TextInput
          variant="secondary"
          search={true}
          className="search-component"
          placeholder="Search"
          value=""
          onValueChange={() => {}}
        />
        <button>
          <FiPlus
            onClick={() => {
              dispatch({
                type: ModalActionTypes.SHOW_MODAL,
                payload: {
                  title: "Create Folder",
                  component: CreateFolder,
                  data: {
                    id: "",
                    path: "",
                  },
                },
              });
            }}
          />
        </button>
      </div>

      <div id="folder-nav">
        <div>
          {activeNavTabIndex === 0 ? (
            availableFolders.length === 0 ? (
              <div className="no-folders">
                <p>
                  Keep content organized with
                  <br />
                  folders &amp; subfolders.
                </p>
              </div>
            ) : (
              <FolderNavigation
                data={treeData}
                onAdd={(nodeKey, currentPath) =>
                  dispatch({
                    type: ModalActionTypes.SHOW_MODAL,
                    payload: {
                      title: "Create Folder",
                      component: CreateFolder,
                      data: {
                        id: nodeKey,
                        path: currentPath,
                      },
                    },
                  })
                }
                onDelete={(nodeKey: string) => deleteSelectedFolder(nodeKey)}
                onBlur={(nodeData: { id: string; label: string }) =>
                  editSelectedFolder(nodeData)
                }
                onSelect={(id) => getFolderBookmarks(id)}
                selectedId={selectedFolderId}
              />
            )
          ) : (
            <FolderNavigation
              variant="tags"
              menu={true}
              data={treeData}
              onDelete={(nodeKey: string) => deleteSelectedFolder(nodeKey)}
              onBlur={(nodeData: { id: string; label: string }) =>
                editSelectedFolder(nodeData)
              }
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SideNavigation;
