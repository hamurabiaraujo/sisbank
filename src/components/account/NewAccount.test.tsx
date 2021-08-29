import React from 'react';
import { render, screen } from '@testing-library/react';
import NewAccount from './NewAccount';

test('renders New account component', () => {
    render(<NewAccount />);
    const linkElement = screen.getByLabelText('Número da conta:');
    const linkElement2 = screen.getByDisplayValue('Criar');
    expect(linkElement).toBeInTheDocument();
    expect(linkElement2).toBeInTheDocument();
});
