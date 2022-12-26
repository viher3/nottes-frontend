import {NavigateFunction} from "react-router/lib/hooks"
import {FolderContent} from "../../Model/FolderContent/FolderContent"
import {FOLDER_CONTENT_TYPE_FOLDER, FOLDER_CONTENT_TYPE_TEXT} from "../../Model/FolderContent/FolderContentType"
import {ROUTE_PATHS} from "../../Config/Router/Routes";

export const open = (
    folderContent : FolderContent,
    navigate: NavigateFunction
) : void => {
    if(folderContent.type === FOLDER_CONTENT_TYPE_FOLDER){
        openDir(folderContent.id, navigate)
    }

    if(folderContent.type === FOLDER_CONTENT_TYPE_TEXT){
        openText(folderContent.id, navigate)
    }
}

/**
 * @param id
 * @param navigate
 */
const openDir = (id : string, navigate: NavigateFunction) : void => {
    navigate(ROUTE_PATHS.VIEW_FOLDER.replace(':id', id))
}

/**
 * @param id
 * @param navigate
 */
const openText = (id : string, navigate: NavigateFunction) : void => {
    console.log('openText')
}
