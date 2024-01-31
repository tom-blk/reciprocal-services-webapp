import './alert-message.styles.scss';

interface PropsError{
  errorMessage: string;
  successMessage?: never;
}

interface PropsSuccess{
  errorMessage?: never;
  successMessage: string;
}

type Props = PropsError | PropsSuccess;

const AlertMessageComponent = ({errorMessage, successMessage}: Props) => {
  return (
    <div className={`alert-toast ${errorMessage && 'error-alert-message'} ${successMessage && 'success-alert-message'}`}>
        {errorMessage && <div>{errorMessage}</div>}
        {successMessage && <div>{successMessage}</div>}
    </div>
  )
}

export default AlertMessageComponent