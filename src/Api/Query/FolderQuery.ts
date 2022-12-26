import http from '../../Services/Http/HttpClient'

export const getFoldersQuery = async (folderId: string = "0") => {
    return await http.get(`/folder/${folderId}`)
}
