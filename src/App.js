import { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './style.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';
import NewPost from './pages/NewPost';
import FullPost from './pages/FullPost';
import Header from './components/Header';
import firebase from './firebase';

/**
 * This is the main component of the application.
 * It's responsible for mananging routes, checks whether
 * the firebase was initialized and the components
 * that will appear on the sreen.
 */
class App extends Component{ 

    state = {
        firebaseInitialized: false
    }

    /**
     * This method checks whether the firebase was initialized.
     * This method is executed when this component is assembled.
     */
    componentDidMount(){
        firebase.isInitialized().then(result => {
            this.setState({firebaseInitialized: result});
        });
    }

    /**
     * This method renders the components on the screen
     */
    render(){
        return this.state.firebaseInitialized !== false ? (
            <div>
                <BrowserRouter>
                    <Header />
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/post/:id" component={FullPost} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/dashboard" component={Dashboard} />
                        <Route exact path="/dashboard/new" component={NewPost} />
                        <Route exact path="/register" component={Register} />
                    </Switch>
                </BrowserRouter>
            </div>
        ) :
        (<div>
            <h1>Carregando...</h1>
        </div>);
    }
}

export default App;