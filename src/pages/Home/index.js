import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './home.css';
import firebase from './../../firebase'; //firebase instace created by me.

class Home extends Component{

    constructor(props){
        super(props);
        this.state = {
            posts: []
        }
        this.fillPostDescription = this.fillPostDescription.bind(this);
    }

    componentDidMount(){
        firebase.database.ref("posts").on("value", snapshot =>{
            let state = this.state;
            snapshot.forEach(child => {
                state.posts.push({
                    key: child.key,
                    tittle: child.val().titulo,
                    image: child.val().imagem,
                    description: child.val().descricao,
                    author: child.val().autor
                });
            });
            this.state.posts.reverse();
            this.setState(state);
        });
    }

    fillPostDescription(str){
        let strArray = str.split("");
        let description = "";
        let count = 0;
        strArray.forEach(caracter => {
            if(count <= 500){
                description += caracter;
                count ++;
            }
        });
        return description + "...";
    }

    render(){
        return(
            <main id="posts">
                {this.state.posts.map(post => {
                    return(
                        <article key={post.key}>
                            <header>
                                <div className="tittle">
                                    <strong>{post.tittle}</strong>
                                    <span>Autor: {post.author}</span>
                                </div>
                            </header>
                            <img src={post.image} alt="Capa do post"/>
                            <footer>
                                <p>
                                    {this.fillPostDescription(post.description)}
                                    <Link to={`/post/:${post.key}`} post={post}>ver post completo</Link>
                                </p>
                            </footer>
                        </article>
                    );
                })}
            </main>
        );
    }
}

export default Home;