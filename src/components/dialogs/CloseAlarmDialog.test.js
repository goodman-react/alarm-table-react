import React from 'react';
import { render, screen } from '@testing-library/react';

import CloseAlarmDialog from './CloseAlarmDialog';
import { Provider } from 'react-redux';
import store from "./../../redux/store";

describe('AcknowledgeDialog', () => {
    test('renders AcknowledgeDialog component', () => {
        render(
            <Provider store={store}>
                <CloseAlarmDialog isOpen={true} />
            </Provider>
        );

        screen.debug();
    });
});