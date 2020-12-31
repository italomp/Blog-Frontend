import { Component } from 'react';
import firebase from './../../firebase';
import './../Home/home.css';

class FullPost extends Component{

    constructor(props){
        super(props);
        this.state = {
            postId: "",
            tittle: "",
            author: "",
            image: "",
            description: ""

        }
        this.loadPost = this.loadPost.bind(this);
    }

    async componentDidMount(){
        this.loadPost();
    }

    async loadPost(){
        let { id } = await this.props.match.params;
        id = id.substring(1); //id without :

        await firebase.database.ref("posts")
        .child(id).on("value", snapshot => {
            this.setState({
                tittle: snapshot.val().titulo,
                author: snapshot.val().autor,
                image: snapshot.val().imagem,
                description: snapshot.val().descricao
            });
        });
    }

    render(){
        return(
            <main id="posts">
                <article key={this.state.key}>
                    <header>
                        <div className="tittle">
                            <strong>{this.state.tittle}</strong>
                            <span>Autor: {this.state.author}</span>
                        </div>
                    </header>
                    <img src={this.state.image} alt="Capa do post"/>
                    <footer>
                        <p>
                            {this.state.description}
                        </p>
                    </footer>
                </article>
            </main>
        )
    }
}

export default FullPost;