import './errorMessageForm.css';

const ErrorMessageForm = (props) =>{
    return(
        <div id="error-message-form">
           <h3>{props.msg}</h3>
        </div>
    );
}

export default ErrorMessageForm;