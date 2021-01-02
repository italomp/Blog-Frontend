import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './home.css';
import firebase from './../../firebase'; //firebase instace created by me.

/**
 * This component represents the home page of the blog.
 */
class Home extends Component{

    constructor(props){
        super(props);
        this.state = {
            posts: []
        }
        this.fillPostDescription = this.fillPostDescription.bind(this);
    }

    /**
     * This method takes the posts in database and saves it
     * in a array called post in the component state.
     * This method execete when this component is assembled.
     */
    componentDidMount(){
        firebase.database.ref("posts").on("value", snapshot =>{
            let posts = [];
            snapshot.forEach(child => {
                posts.push({
                    key: child.key,
                    tittle: child.val().titulo,
                    image: child.val().imagem,
                    description: child.val().descricao,
                    author: child.val().autor
                });
            });
            posts.reverse();
            this.setState({posts});
        });
    }

    /**
     * This method receives a string as parameter and
     * build a thumbnail with 500 characters.
     * 
     * @param str is a long string.
     */
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

    /**
     * This method is responsible for rendering elements on the screen.
     */
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
                                    <Link to={`/post/:${post.key}`}>ver post completo</Link>
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