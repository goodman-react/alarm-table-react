import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { screen } from '@testing-library/dom';

import ChangeSeverityDialog from './ChangeSeverityDialog';
import { Provider } from 'react-redux';
import store from "./../../redux/store";

describe('ChangeSeverityDialog', () => {
    test('renders ChangeSeverityDialog component', () => {
        render(
            <Provider store={store}>
                <ChangeSeverityDialog isOpen={true} />
            </Provider>
        );
        screen.debug();
    });
});
