import { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import firebase from './../../firebase';
import './dashboard.css';

/**
 * This component represents the dashboard page, which
 * the user can see after logging in the blog.
 */
class Dashboard extends Component{

    constructor(props){
        super(props)
        this.state = {
            name: localStorage.userName,
            email: localStorage.userEmail
        }
        this.logout = this.logout.bind(this);
        this.updateUserDatasIntoLocalStorage = this.updateUserDatasIntoLocalStorage.bind(this);
    }

    /**
     * This method checks whether the user is logged in.
     * If he doesn't logged in, he will be redirected to the login page.
     * If the user is logged in, he username and email will savers in the
     * localStorage to be accessed more fast.
     * This method is executed when this component is assembled.
     */
    async componentDidMount(){
        if(firebase.getCurrentUser() == null){
            this.props.history.replace("/login");
            return null;
        }
        this.updateUserDatasIntoLocalStorage();
    }

    /**
     * This method is responsible for save tha username and the user email
     * in localStorage.
     */
    async updateUserDatasIntoLocalStorage(){
        localStorage.userEmail = firebase.getCurrentUser();
        localStorage.userName = await firebase.getTheNameOfTheCurrentUser();
        this.setState({
            name: localStorage.userName,
            email: localStorage.userEmail
        });
    }

    /**
     * This mehtos is responsible for user logout.
     */
    async logout(){
        await firebase.logout()
        .catch(error => {
            console.log(error.message);
        });
        localStorage.removeItem("userName");
        localStorage.removeItem("userEmail");
        this.props.history.push("/");
    }

    /**
     * This method is responsible for rendering elements on the screen.
     */
    render(){
        return(
            <div id="dashboard">
                <div className="user-info">
                    <h1>Olá {this.state.name}</h1> 
                    <Link to="/dashboard/new">Novo Post</Link>
                </div>
                <p>Logado com: {this.state.email}</p>
                <button onClick={this.logout}>Deslogar</button>
            </div>
            
        );
    }
}

//exporting with withRouter to can access the history object.
export default withRouter(Dashboard);