import { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import firebase from './../../firebase';
import './dashboard.css';

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

    async componentDidMount(){
        if(!firebase.getCurrentUser){
            this.props.history.replace("/login");
            return null;
        }
        this.updateUserDatasIntoLocalStorage();
    }

    async updateUserDatasIntoLocalStorage(){
        localStorage.userEmail = firebase.getCurrentUser();
        localStorage.userName = await firebase.getTheNameOfTheCurrentUser();
        this.setState({
            name: localStorage.userName,
            email: localStorage.userEmail
        });
    }

    async logout(){
        await firebase.logout()
        .catch(error => {
            console.log(error.message);
        });
        localStorage.removeItem("userName");
        localStorage.removeItem("userEmail");
        this.props.history.push("/");
    }

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

//exporting with withRouter to can access the history object
export default withRouter(Dashboard);