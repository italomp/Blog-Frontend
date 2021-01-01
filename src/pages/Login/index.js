import { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import firebase from './../../firebase';
import './login.css';

/**
 * This component represents the login page.
 */
class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            email: "",
            password: "",
            alert: ""
        }
        this.login = this.login.bind(this);
    }

    /**
     * This method check whether there is user logged in.
     * This method execete when this component is assembled.
     */
    componentDidMount(){    
        if(firebase.getCurrentUser()){
            this.props.history.replace("/dashboard");
        }
    }

    /**
     * This method logs the user on and handle errors.
     * 
     * @param event is the event added in html element. 
     */
    async login(event){
        event.preventDefault();
        const { email, password } = this.state;
        try{
            await firebase.login(email, password)
            .then(
                this.props.history.replace("/dashboard")
            )
            .catch(error => {
                if(error.code === "auth/user-not-found"){
                    alert("Este usuário não existe!");
                }
                else{
                    alert("Código de erro: " + error.code);
                }
                return null;
            });
        }catch(error){
            alert(error.message);
        }
    }

    /**
     * This method is responsible for rendering elements on the screen.
     */
    render(){
        return(
            <div>
                <form onSubmit={this.login} id="login">
                    <label>Email: </label>
                    <input type="email" autoFocus placeholder={"exemplo@gamil.com"}
                     onChange={ event => {this.setState({email: event.target.value})}} />
                    
                    <label>Senha: </label>
                    <input type="password" autoComplete="off" placeholder={"Sua senha"} 
                     onChange={ event => {this.setState({password: event.target.value})}} />

                    <button type="submit">Entrar</button>
                    <Link to="/register">Ainda não possui uma conta?</Link>
                </form>
            </div>
        );
    }
}

export default withRouter(Login);