import { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './style.css';
import Home from './pages/Home';
import Header from './components/Header';
import firebase from './firebase';

/**
 * 
 */
class App extends Component{ 

    state = {
        firebaseInitialized: false
    }

    componentDidMount(){
        firebase.isInitialized().then(result => {
            this.setState({firebaseInitialized: result});
        });
    }

    render(){
        return this.state.firebaseInitialized !== false ? (
            <div>
                <BrowserRouter>
                    <Header />
                    <Switch>
                        <Route exact path="/" component={Home} />
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