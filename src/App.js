import { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './style.css';
import Home from './pages/Home';
import Header from './components/Header';

/**
 * 
 */
class App extends Component{ 

    render(){
        return(
            <div>
                <BrowserRouter>
                    <Header />
                    <Switch>
                        <Route exact path="/" component={Home} />
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;