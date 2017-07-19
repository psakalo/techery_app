import React from 'react';
import { mount } from 'enzyme';

import TopPanel from './TopPanel';

describe("TopPanel component", () => {
    test("renders without crashing", () => {
        const wrapper = mount(<TopPanel height={100} />);
        expect(wrapper).toHaveLength(1);
    });
});