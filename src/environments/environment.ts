export const environment = {
    production: false,
    RUN_ENVIRONMENT: 'dev',
    COUNTRY: 'US',
    config: {
        // LT Account
        apiKey: 'AIzaSyB7Q6KO11AvlTu7aeXYmN0L23KagtC7_pg',
        authDomain: 'bibworks-delivery-280621.firebaseapp.com',
        databaseURL: 'https://bibworks-delivery-280621.firebaseio.com',
        projectId: 'bibworks-delivery-280621',
        storageBucket: 'bibworks-delivery-280621.appspot.com',
        messagingSenderId: '50613091837',
        appId: '1:50613091837:web:2122d005cb027ff42ead94',
        measurementId: 'G-B3XZ329B4F',
    },
    
    apiKey: 'AIzaSyB7Q6KO11AvlTu7aeXYmN0L23KagtC7_pg',
    API_URLS: {
        dev: 'http://192.168.1.2:3000',
        prod: '',
    },
  
    GOOGLE_MAPS_API_KEY: 'AIzaSyB7Q6KO11AvlTu7aeXYmN0L23KagtC7_pg',
    IONIC_STORAGE: 'userdb',
    DRIVER_DELAY_MSG: 'No driver is available. Please try again later',
    DRIVER_REJECTED_MSG: 'Driver rejected your booking',
 
    RENDER_OPTIONS: {
        suppressMarkers: true,
    },
    RESET_EMAIL_SENT: 'Please check your email to reset your password.',
    RESET_NOT_EMAIL_SENT: 'Reset Email not sent, please check your email and try again.',
    NO_HISTORY: 'No history data available...',
    SELECT_DESTINATION_WARN: 'Select destination location',
    SELECT_ORIGIN_WARN: 'Select origin location',
    SCREEN_OPTIONS: {},
    COUNTRY_DIAL_CODES: [
        {
            name: 'United States',
            dialCode: '+1',
            code: 'US',
        },
        {
            name: 'Algeria',
            dialCode: '+213',
            code: 'DZ',
        },
    ],
    UPDATE_PAYMENT_METHOD: 'Please update your Payment Method',
    DELETE_CARD: 'Please Confirm Deleting this item...',
    USER_CONFIRM_MSG: 'Do you want to confirm booking?',
    RIDE_COMPLETED_MSG: 'Thank you for using BibWors Delivery',
    USER_CANCEL_MSG:  'Do you want to cancel this pickup request ? Driver is already on his way',
    
};
