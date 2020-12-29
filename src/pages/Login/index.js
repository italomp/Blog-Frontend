import { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import firebase from './../../firebase';
import './login.css';

/**
 * This component is responsible for login feature
 * 
 * Dependences:
 * Component - It's used so that Login can access state object.
 * Link - It's used to redirect the user to another route.
 * withRouter - It's used so that Login can access history object.
 * The history object provides implementations for handling the session
 * stack.
 * The session stack storage routes/pages that the user browses.
 * firebase - It's provide access to datase and authetication features.
 */
class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            email: "",
            password: ""
        }
        this.login = this.login.bind(this);
    }

    componentDidMount(){    
        if(firebase.getCurrentUser()){
            this.props.history.replace("/dashboard");
        }
    }

    async login(event){
        event.preventDefault();
        const { email, password } = this.state;
        try{
            await firebase.login(email, password)
            .catch(error => {
                if(error.code === "auth/user-not-found"){
                    alert("Este usuário não existe!");
                }
                else{
                    alert("Código de erro: " + error.code);
                }
                return null; //It's for the replace method don't be executed
            });
            this.props.history.replace("/dashboard");
        }catch(error){
            alert(error.message);
        }
    }

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

//exportando assim teremos acesso ao histórico
export default withRouter(Login);