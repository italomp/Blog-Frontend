import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';

/**
 * Firebase Configuration.
 * When a firebase server is created, it provides these datas.
 */
let firebaseConfig = {
    apiKey: "AIzaSyBQm9-VLPE4J2sJuIIlo66vZGl1aXzu9OY",
    authDomain: "servidor-blog-fb61a.firebaseapp.com",
    databaseURL: "https://servidor-blog-fb61a-default-rtdb.firebaseio.com",
    projectId: "servidor-blog-fb61a",
    storageBucket: "servidor-blog-fb61a.appspot.com",
    messagingSenderId: "332236947595",
    appId: "1:332236947595:web:e709f45393e098b34e948e"
};

/**
 * This class is responsible for communicating with firebase services.
 */
class Firebase{
    constructor(){
        firebase.initializeApp(firebaseConfig);
        this.database = firebase.database();
        this.storage = firebase.storage();
    }

    /**
     * This method is responsible for user login.
     * 
     * @param email is the user email that is registered on the blog
     * @param password is the user password that is registered on the blog
     */
    login(email, password){
        return firebase.auth().signInWithEmailAndPassword(email, password);
    }

    /**
     * This method is responsible for user logout.
     */
    logout(){
        return firebase.auth().signOut();
    }

    /**
     * This method is responsible for registering a new user.
     * 
     * @param nome is the user name who will be registered
     * @param email is the user email who will be registered
     * @param password is the user password who will be registered
     */
    async register(nome, email, password){
        //registering user into Autentication and geting uid user.
        await firebase.auth().createUserWithEmailAndPassword(email, password);
        const uid = firebase.auth().currentUser.uid;

        //registering user into database
        return firebase.database().ref("usuarios").child(uid).set({
            nome: nome,
        });        
    }

    /**
     * This method checks whether the firebase was initialized
     */
    isInitialized(){
        return new Promise(resolve => {
            firebase.auth().onAuthStateChanged(resolve);
        })
    }

    /**
     * This methed returns the email of the current user or null,
     * if there isn't user logged in.
     */
    getCurrentUser(){
        let auth = firebase.auth();
        return auth.currentUser && auth.currentUser.email;
    }

    /**
     * This methed returns the uid of the current user or null,
     * if there isn't user logged in.
     */
    getCurrentUserUid(){
        let auth = firebase.auth();
        return auth.currentUser && auth.currentUser.uid; 
    }

    /**
     * This methed returns the name of the current user or null,
     * if there isn't user logged in.
     */
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