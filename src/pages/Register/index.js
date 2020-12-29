import { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import firebase from './../../firebase';
import "./register.css";


/**
 * This component is responsible for register users.
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
class Register extends Component{
    constructor(props){
        super(props);
        this.state = {
            nome: "",
            email: "",
            password: ""
        }
        this.register = this.register.bind(this);
    }   

    async register(event){
        event.preventDefault();
        try{
            const {nome, email, password} = this.state;
            await firebase.register(nome, email, password);
            this.props.history.replace("/dashboard");
        }catch(error){
            alert(error.message);
        }

    }

    render(){
        return(
            <div>
                <h1 className="register-h1">Novo Usuário</h1>
                <form onSubmit={this.register} id="register">
                    <label>Nome: </label>
                    <input type="text" autoFocus autoComplete="off" placeholder="José da Silva" 
                     onChange={event => this.setState({nome: event.target.value})}/>

                    <label>Email: </label>
                    <input type="text" autoComplete="off" placeholder="exemplo@gmail.com"
                     onChange={event => this.setState({email: event.target.value})}/>

                    <label>Senha: </label>
                    <input type="text" autoComplete="off" placeholder="senhafraca123"
                     onChange={event => this.setState({password: event.target.value})}/>

                    <button type="submit">Cadastrar</button>
                </form>
            </div>
        );
    }
}

//exportando assim teremos acesso ao histórico
export default withRouter(Register);