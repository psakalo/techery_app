import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route} from 'react-router-dom';
import { ButtonGroup, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import PhotosPage from './components/PhotosPage';
import FavouritesPage from './components/FavouritesPage';
import AuthChecker from './components/AuthChecker';
import configureStore from './redux/configureStore';

const reduxStore = configureStore();

const footerStyle =  {
    position: "fixed",
    bottom: "0",
    width: "100%"
};

class App extends Component {
    render() {
        return (
            <Provider store={reduxStore}>
                <AuthChecker>
                    <BrowserRouter>
                        <div>
                            <Switch>
                                <Route exact path="/favourites" component={FavouritesPage} />
                                <Route exact path="/" component={PhotosPage} />
                            </Switch>

                            {/* Navbar */}
                            <ButtonGroup id="navbar" justified style={footerStyle}>
                                <LinkContainer exact to="/">
                                    <Button>Photos</Button>
                                </LinkContainer>
                                <LinkContainer exact to="/favourites">
                                    <Button>Favourites</Button>
                                </LinkContainer>
                            </ButtonGroup>
                        </div>
                    </BrowserRouter>
                </AuthChecker>
            </Provider>
        );
    }
}

export default App;
