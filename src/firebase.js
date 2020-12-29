import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

let firebaseConfig = {
    apiKey: "AIzaSyBQm9-VLPE4J2sJuIIlo66vZGl1aXzu9OY",
    authDomain: "servidor-blog-fb61a.firebaseapp.com",
    databaseURL: "https://servidor-blog-fb61a-default-rtdb.firebaseio.com",
    projectId: "servidor-blog-fb61a",
    storageBucket: "servidor-blog-fb61a.appspot.com",
    messagingSenderId: "332236947595",
    appId: "1:332236947595:web:e709f45393e098b34e948e"
};

class Firebase{
    constructor(){
        firebase.initializeApp(firebaseConfig);
        this.database = firebase.database();
    }

    login(email, password){
        return firebase.auth().signInWithEmailAndPassword(email, password);
    }

    logout(){
        return firebase.auth().signOut();
    }

    async register(nome, email, password){
        //registering user into Autentication and geting uid user.
        await firebase.auth().createUserWithEmailAndPassword(email, password);
        const uid = firebase.auth().currentUser.uid;

        //registering user into database
        return firebase.database().ref("usuarios").child(uid).set({
            nome: nome,
        });        
    }

    isInitialized(){
        return new Promise(resolve => {
            firebase.auth().onAuthStateChanged(resolve);
        })
    }

    getCurrentUser(){
        let auth = firebase.auth();
        /*exp1 && exp2 retorna exp1 se exp1 for false ou falsy, ou exp2 caso contrário*/
        return auth.currentUser && auth.currentUser.email;
    }

    async getTheNameOfTheCurrentUser(){
        let userName, uid;
        let auth = firebase.auth();
        let database = firebase.database();
        if(!auth.currentUser){
            return null;
        }
        uid = auth.currentUser.uid;
        await database.ref("usuarios").child(uid).once("value", snapshot => {
            userName = snapshot.val().nome;
        });
        return userName;
    }

}

//exporting a new firebase instance
export default new Firebase();