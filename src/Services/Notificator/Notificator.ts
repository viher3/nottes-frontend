import toastr from 'toastr'
export class Notificator
{
    static success = (message: string, title: string = '') : void => {
        toastr.success(message, title)
    }

    static error = (message: string, title: string = '') : void => {
        toastr.error(message, title)
    }

    static warning = (message: string, title: string = '') : void => {
        toastr.warning(message, title)
    }
}
