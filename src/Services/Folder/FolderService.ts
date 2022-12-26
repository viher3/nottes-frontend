import {FolderContent} from "../../Model/FolderContent/FolderContent"
import {FOLDER_CONTENT_TYPE_FOLDER, FOLDER_CONTENT_TYPE_TEXT} from "../../Model/FolderContent/FolderContentType"

export const open = (folderContent : FolderContent) : void => {
    if(folderContent.type === FOLDER_CONTENT_TYPE_FOLDER){
        openDir(folderContent.id)
    }

    if(folderContent.type === FOLDER_CONTENT_TYPE_TEXT){
        openText(folderContent.id)
    }
}

const openDir = (id : string) : void => {

}

const openText = (id : string) : void => {

}
