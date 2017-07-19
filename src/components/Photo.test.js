import React from 'react';
import { mount } from 'enzyme';

import Photo from './Photo';

describe("Photo component", () => {
    test("renders without crashing", () => {
        const wrapper = mount(<Photo />);
        expect(wrapper).toHaveLength(1);
    });
});