import React from "react"
import {useNavigate} from "react-router-dom"
import {ROUTE_PATHS} from "../../Config/Router/Routes"
import {Breadcrumb, BreadcrumbItem} from "react-bootstrap"

interface BreadcrumbItem {
    id: string,
    name: string
}

interface Props {
    breadcrumb: BreadcrumbItem[]
}

export const FolderBreadcrumb: React.FC<Props> = (props) => {

    const navigate = useNavigate()

    const folderNameConverter = (item : BreadcrumbItem) => {
        if(item.name === '/') return 'Home'
        return item.name
    }

    const totalItems = () : number => {
        return props.breadcrumb.length
    }

    return (
        <>
            <Breadcrumb>
                {props.breadcrumb.map((item: BreadcrumbItem, key: number) => {
                    const isActive = key === (totalItems()-1)
                    return (
                        <BreadcrumbItem
                            key={key}
                            onClick={() => navigate(ROUTE_PATHS.VIEW_FOLDER.replace(':id', item.id))}
                            title={item.name}
                            active={isActive}
                        >
                            {folderNameConverter(item)}
                        </BreadcrumbItem>
                    )
                })}
            </Breadcrumb>
        </>
    )
}
