import { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import './newPost.css';
import firebase from './../../firebase';
import ErrorMessageForm from './../../components/ErrorMssageForm';

/**
 * This component represents the page that register a new post.
 */
class NewPost extends Component{
    constructor(props){
        super(props);
        this.state = {
            tittle: "",
            imageUrl: "",
            description: "",
            alert: "",
            progress: 0
        }
        this.register = this.register.bind(this);
        this.handleFile = this.handleFile.bind(this);
        this.sendPostCover = this.sendPostCover.bind(this);
    }

    /**
     * This method check whether there is user logged on.
     * If there isn't user logged on, the user will be redirected
     * to the home page.
     * This method execete when this component is assembled.
     */
    componentDidMount(){
        if(firebase.getCurrentUser() == null){
            this.props.history.replace("/");
            return null;
        }
    }

    /**
     * This method saves a new post in database.
     * @param event is the event added to html element. 
     */
    async register(event){
        let newPostTittle = this.state.tittle;
        let newPostImageUrl = this.state.imageUrl;
        let newPostDescription = this.state.description;
        event.preventDefault();
        if(newPostTittle !== "" && newPostImageUrl !== "" && newPostDescription !== ""){
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

    /**
     * This method handles the image sent for the cover post.
     * @param event is the event added to html element. 
     */
    async handleFile(event){
        if(event.target.files[0]){
            const image = event.target.files[0];
            if(image.type === "image/png" || image.type === "image/jpeg"){
                //trato a img
                await this.sendPostCover(image);
            }
            else{
                alert("Selecione uma imagem PNG ou JPG");
            }
        }
    }

    /**
     * This method sends the cover post to firebase storage.
     * @param {*} image 
     */
    async sendPostCover(image){
        const currentUid = firebase.getCurrentUserUid();
        const uploadTask = firebase.storage
        .ref(`images/${currentUid}/${image.name}`)
        .put(image);

        /** 
         * state_changed event receives three callbacks. One 
         * for progress, one for error and one for success.
         * This is a firebase event.
         */
        await uploadTask.on("state_changed", (snapshot) => {
            //progress
            const progress = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            this.setState({progress: progress});
        },
        (error) => {
            //error
            console.log("Erro ao enviar a imagem: " + error);
        },
        () => {
            //success
            firebase.storage.ref(`images/${currentUid}`)
            .child(image.name).getDownloadURL()
            .then(url => {
                this.setState({imageUrl: url});
            });
        });
    }

    /**
     * This method is responsible for rendering elements on the screen.
     */
    render(){
        return(
            <div id="new-post">
                <header id="new-post-header">
                    <Link to="/dashboard"> Voltar</Link>
                </header>
                <form onSubmit={this.register} id="new-post-form">
                    {this.state.alert && <ErrorMessageForm msg={this.state.alert}/>}

                    <label>Título: </label>
                    <input type="text" placeholder="Título do Post" autoFocus
                     onChange={event => this.setState({tittle: event.target.value})}/>

                    <label>Descrição: </label>
                    <textarea type="text" placeholder="Nesse post aprenderemos sobre..." 
                     onChange={event => this.setState({description: event.target.value})}/>

                    <label>Selecione uma Capa: </label>
                    <input type="file" onChange={this.handleFile}/>
                    {this.state.imageUrl !== "" ? 
                     <img src={this.state.imageUrl} alt="Capa do Post"/>
                     :
                     <progress value={this.state.progress} max="100"/>
                     }
                    <button type="submit">Cadastrar</button>
                </form>
            </div>
        );
    }
}

export default withRouter(NewPost);