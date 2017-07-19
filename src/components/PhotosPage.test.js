import React from 'react';
import { mount } from 'enzyme';

import PhotosPage from './PhotosPage';

describe("PhotosPage component", () => {
    const initialStore = {
        photos: {
            photos: [],
            currentPage: 1,
            totalPages: 1
        }
    };

    test("renders without crashing", () => {
        const wrapper = mount(<PhotosPage store={mockStore(initialStore)}/>);
        expect(wrapper).toHaveLength(1);
    });
});