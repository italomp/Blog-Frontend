import React, { Component } from 'react';
import './home.css';
import firebase from './../../firebase'; //firebase instace created by me.

class Home extends Component{

    state = {
        posts: []
    }

    componentDidMount(){
        firebase.database.ref("posts").on("value", snapshot =>{
            let state = this.state;
            snapshot.forEach(child => {
                state.posts.push({
                    chave: child.val().key,
                    titulo: child.val().titulo,
                    imagem: child.val().imagem,
                    descricao: child.val().descricao,
                    autor: child.val().autor
                });
            });
            state.posts.reverse();
            this.setState(state);
        });
    }

    render(){
        return(
            <main id="posts">
                {this.state.posts.map(post => {
                    return(
                        <article key={post.key}>
                            <header>
                                <div className="tittle">
                                    <strong>{post.titulo}</strong>
                                    <span>Autor: {post.autor}</span>
                                </div>
                            </header>
                            <img src={post.imagem} alt="Capa do post"/>
                            <footer>
                                <p>{post.descricao}</p>
                            </footer>
                        </article>
                    );
                })}
            </main>
        );
    }
}

export default Home;