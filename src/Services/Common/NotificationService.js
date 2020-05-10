import { store } from 'react-notifications-component';

/**
 * App notifications service
 */
class NotificationService
{
    /**
     * Add new notification
     *
     * @param type
     * @param title
     * @param message
     */
    static add(type, title, message)
    {
        let params = {
            message: message,
            type: type,
            container: "top-right",
            insert: "top",
            animationIn: ["animated", "fadeIn"],
            animationOut: ["animated", "fadeOut"],
            dismiss: {
                duration: 5000,
            }
        };

        if(title) {
            params['title'] = title;
        }

        store.addNotification(params);
    }

    /**
     * Add new error notification
     *
     * @param title
     * @param message
     */
    static error(title, message)
    {
        this.add('danger', title, message)
    }

    /**
     * Catch server errors
     *
     * @param error
     */
    static catchServerErrors(error)
    {
        if(!error.response) {
            console.log(error)
            return
        }

        let response = error.response
        let errorCode = response.status ?? null
        let responseErrors = response.data.errors ?? null

        if(responseErrors) {
            let errors = ''

            for(let i in responseErrors) {
                let error = responseErrors[i]

                if(error){
                    errors += "\n" + error
                }
            }

            if(errors.length) {
                this.error(errorCode + ' HTTP ERROR', errors)
            }
        }
    }
}

export default NotificationService;
