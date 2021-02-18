import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SuccessModal from '../../components/SuccessModal';

test('Renders SuccessModal component ', () => {
    const closeHandler = jest.fn();
    render(<SuccessModal showModal={true} closeHandler={closeHandler}/>);
    expect(screen.getByTestId('success-modal-title')).toBeInTheDocument();
    expect(screen.getByTestId('success-modal-text')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
});

test('Calls closeHandler when clicking ok button ', () => {
    const closeHandler = jest.fn();
    render(<SuccessModal showModal={true} closeHandler={closeHandler}/>);

    const okButton = screen.getByRole('button', {name: 'Ok'});
    userEvent.click(okButton);
    expect(closeHandler).toHaveBeenCalledTimes(1);
});