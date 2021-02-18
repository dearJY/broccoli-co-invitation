import { render, screen } from '@testing-library/react';
import Home from '../../components/Home';

test('Renders Home component', () => {
    render(<Home />);
    expect(screen.getByTestId('home-header')).toHaveTextContent('BROCCOLI & CO.');
    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByTestId('home-footer')).toHaveTextContent('Made with love in Melbourne.');
    expect(screen.getByTestId('home-footer')).toHaveTextContent('2021 Broccoli & CO. All rights reserved');
})