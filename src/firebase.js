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

    async register(nome, email, password){
        //registering user into Autentication and geting uid user.
        await firebase.auth().createUserWithEmailAndPassword(email, password);
        let uid = firebase.auth().currentUser.uid;

        //registering user into database
        firebase.database().ref("usuarios").child(uid).set({
            nome: nome,
        });        
    }

    isInitialized(){
        return new Promise(resolve => {
            firebase.auth().onAuthStateChanged(resolve);
        })
    }

    getDatabase(){
        return this.firebase.database();
    }
}

//exporting a new firebase instance
export default new Firebase();