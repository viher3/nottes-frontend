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
}

export default NotificationService;
