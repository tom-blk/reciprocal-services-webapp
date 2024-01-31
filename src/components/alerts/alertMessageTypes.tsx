interface Options{
    type: 'error' | 'success';
    className: string;
    progressClassName: string;
}

export const errorMessageOptions: Options = {
    type: 'error',
    className: 'error-alert-toast',
    progressClassName: 'error-alert-progress',
}

export const successMessageOptions: Options = {
    type: 'success',
    className: 'success-alert-toast',
    progressClassName: 'success-alert-progress',
}