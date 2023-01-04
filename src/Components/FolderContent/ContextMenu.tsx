import React, {ReactNode, useImperativeHandle} from "react"
import {Menu, useContextMenu} from "react-contexify"

interface Props {

    onVisibilityChange?: (isVisible: boolean) => void,
    children: ReactNode,
    ref: React.Ref<any>
}

export const ContextMenu: React.FC<Props> = React.forwardRef((props, ref) => {
    const MENU_ID = 'folderContentMenu'
    const {show} = useContextMenu({id: MENU_ID})

    useImperativeHandle(ref, () => ({
        open(e : any){
            show({event: e})
        }
    }))

    return (
        <>
            <Menu
                id={MENU_ID}
                theme={"dark"}
                onVisibilityChange={props.onVisibilityChange}
                animation={"slide"}
            >
                {props.children}
            </Menu>
        </>
    )

})
