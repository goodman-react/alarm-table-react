import React from 'react';
import { render, screen } from '@testing-library/react';
 
import AcknowledgeDialog from './AcknowledgeDialog';
 
describe('AcknowledgeDialog', () => {
  test('renders AcknowledgeDialog component', () => {
    render(<AcknowledgeDialog />);
 
    screen.debug();
    screen.getByRole('');
  });
});