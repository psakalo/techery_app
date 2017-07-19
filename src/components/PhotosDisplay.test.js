import React from 'react';
import { mount } from 'enzyme';

import PhotosDisplay from './PhotosDisplay';

describe("PhotosDisplay component", () => {
    test("renders without crashing", () => {
        const wrapper = mount(<PhotosDisplay photos={[]} onNextPage={jest.fn()}/>);
        expect(wrapper).toHaveLength(1);
    });
});