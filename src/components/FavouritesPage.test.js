import React from 'react';
import { mount } from 'enzyme';

import FavouritesPage from './FavouritesPage';

describe("FavouritesPage component", () => {
    const initialStore = {
        favourites: {
            photos: {}
        }
    };

    test("renders without crashing", () => {
        const wrapper = mount(<FavouritesPage store={mockStore(initialStore)}/>);
        expect(wrapper).toHaveLength(1);
    });
});