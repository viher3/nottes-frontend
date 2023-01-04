import http from '../../Services/Http/HttpClient'

export interface CreateFolderMutationBody {
    name: string,
    parentId: string,
    description: string
}

export const createFolderMutation = async (
    body: CreateFolderMutationBody
) => {
    const data: { [key: string]: string } = {
        name: body.name,
        parent: body.parentId
    }

    if (body.description) {
        data['description'] = body.description
    }

    return await http.post(`/folder`, data)
}
