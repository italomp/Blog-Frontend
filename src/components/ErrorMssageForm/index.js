import './errorMessageForm.css';

/**
 * This component is shown when a user tries register a
 * new post, but doesn't fill complete the entire form.
 */
const ErrorMessageForm = (props) =>{
    return(
        <div id="error-message-form">
           <h3>{props.msg}</h3>
        </div>
    );
}

export default ErrorMessageForm;