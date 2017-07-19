import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route} from 'react-router-dom';
import { ButtonGroup, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import PhotosPage from './components/PhotosPage';
import FavouritesPage from './components/FavouritesPage';
import configureStore from './redux/configureStore';

const reduxStore = configureStore();

const FOOTER_HEADER_HEIGHT = 40;
const PHOTOS_PER_PAGE = 36;

const footerStyle =  {
    position: "fixed",
    bottom: 0,
    width: "100%",
    height: FOOTER_HEADER_HEIGHT
};

class App extends Component {
    render() {
        return (
            <Provider store={reduxStore}>
                <BrowserRouter>
                    <div>
                        <Switch>
                            <Route exact path={process.env.PUBLIC_URL + "/favourites"} render={props => (
                                <FavouritesPage
                                    perPage={PHOTOS_PER_PAGE}
                                    footerHeight={footerStyle.height}
                                    headerHeight={FOOTER_HEADER_HEIGHT}
                                />
                            )} />
                            <Route exact path={process.env.PUBLIC_URL + "/"} render={props => (
                                <PhotosPage
                                    perPage={PHOTOS_PER_PAGE}
                                    footerHeight={footerStyle.height}
                                    headerHeight={FOOTER_HEADER_HEIGHT}
                                />
                            )} />
                        </Switch>

                        {/* Tabs */}
                        <ButtonGroup justified style={footerStyle}>
                            <LinkContainer exact to={process.env.PUBLIC_URL + "/"}>
                                <Button>Photos</Button>
                            </LinkContainer>
                            <LinkContainer exact to={process.env.PUBLIC_URL + "/favourites"}>
                                <Button>Favourites</Button>
                            </LinkContainer>
                        </ButtonGroup>
                    </div>
                </BrowserRouter>
            </Provider>
        );
    }
}

export default App;
