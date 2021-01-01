import { Component } from 'react';
import firebase from './../../firebase';
import './../Home/home.css';

/**
 * This component represents the full post.
 * When the user click in "see more" in the thumbnail post,
 * on home page, he will see this full post component.
 */
class FullPost extends Component{

    constructor(props){
        super(props);
        this.state = {
            postId: "",
            tittle: "",
            author: "",
            image: "",
            description: "",

        }
        this.loadPost = this.loadPost.bind(this);
    }

    /**
     * This method execete the loadPost method, when this 
     * component is assembled.
     */
    async componentDidMount(){
        this.loadPost();
    }

    /**
     * This method takes a post from the database and saves 
     * it in this component state.
     */
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

    /**
     * This method is responsible for rendering elements on the screen.
     */
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