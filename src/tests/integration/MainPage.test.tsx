import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MainPage from '../../components/MainPage';

beforeEach(() => {
    render(<MainPage />);
})

test('Renders MainPage component', () => {
    expect(screen.getByText('A better way')).toBeInTheDocument();
    expect(screen.getByText('to enjoy every day')).toBeInTheDocument();
    expect(screen.getByText('Be the first to know when we launch')).toBeInTheDocument();
    expect(screen.getByRole('button', {name: 'Request an invite'})).toBeInTheDocument();
})

test('Shows InviteModal when clicking request button', () => {
    const requestButton = screen.getByRole('button', {name: 'Request an invite'});
    userEvent.click(requestButton);
    expect(screen.getByTestId('invite-modal')).toBeInTheDocument();
});