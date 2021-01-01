import { Component } from 'react';
import { withRouter } from 'react-router-dom';
import firebase from './../../firebase';
import "./register.css";


/**
 * This component represents the user registration page.
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

    /**
     * This method registers a nwr user and handle sending erros.
     */
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

    /**
     * This method is responsible for rendering elements on the screen.
     */
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

export default withRouter(Register);