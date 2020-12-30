import { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import './newPost.css';
import firebase from './../../firebase';

class NewPost extends Component{
    constructor(props){
        super(props);
        this.state = {
            tittle: "",
            imageUrl: "",
            description: "",
            alert: ""
        }
        this.register = this.register.bind(this);
    }

    componentDidMount(){
        if(firebase.getCurrentUser() == null){
            this.props.history.replace("/");
            return null;
        }
    }

    async register(event){
        let newPostTittle = this.state.tittle;
        let newPostImageUrl = this.state.imageUrl;
        let newPostDescription = this.state.description;
        event.preventDefault();
        if(newPostTittle != "" && newPostImageUrl != "" && newPostDescription != ""){
            let posts = firebase.database.ref("posts");
            let postKey = posts.push().key;
            await posts.child(postKey).set({
                titulo: newPostTittle,
                descricao: newPostDescription,
                imagem: newPostImageUrl,
                autor: localStorage.userName
            });
            this.props.history.replace("/dashboard");  
        }
        else{
            this.setState({alert: "Preencha Todos os Campos!"});
        }
    }

    render(){
        return(
            <div id="new-post">
                <header id="new-post-header">
                    <Link to="/dashboard"> Voltar</Link>
                </header>
                <form onSubmit={this.register} id="new-post-form">
                    <span>{this.state.alert}</span>
                    <label>Título: </label>
                    <input type="text" placeholder="Título do Post" autoFocus
                     onChange={event => this.setState({tittle: event.target.value})}/>

                    <label>URL da Imagem: </label>
                    <input type="text" placeholder="Url da capa" 
                     onChange={event => this.setState({imageUrl: event.target.value})}/>

                    <label>Descrição: </label>
                    <textarea type="text" placeholder="Nesse post aprenderemos sobre..." 
                     onChange={event => this.setState({description: event.target.value})}/>

                    <button type="submit">Cadastrar</button>
                </form>
            </div>
        );
    }
}

export default withRouter(NewPost);