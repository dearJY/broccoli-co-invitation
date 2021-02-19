import { fireEvent, render, screen } from '@testing-library/react';
import InviteModal from '../../components/InviteModal';
import { setupServer } from 'msw/node'
import { rest } from 'msw';
import { SEND_INVITE_URL } from '../../apis'; 

interface RequestBody {
    name: string,
    email: string
}

const server = setupServer(
    rest.post<RequestBody, string>(SEND_INVITE_URL, (req, res, ctx) => {
        const { email } = req.body;
        if (email === 'failure@airwallex.com') {
            return res(
                ctx.status(500)
            )
        } else {
            return res(
                ctx.json('Registered')
            )
        }
    })
);

test('Renders InviteModal component', () => {
    const closeHandler = jest.fn();
    render(<InviteModal showModal={true} closeHandler={closeHandler}/>);

    expect(screen.getByTestId('invite-modal-title')).toBeInTheDocument();
    
    const inputs = screen.getByTestId('invite-modal-form');
    expect(inputs).toBeInTheDocument();
    expect(inputs.children.length).toBe(3);

    expect(screen.getByRole('button')).toBeInTheDocument();
});

test('Validates form inputs', async() => {
    const closeHandler = jest.fn();
    render(<InviteModal showModal={true} closeHandler={closeHandler}/>);
    
    const nameInput = screen.getByLabelText('Full name');
    const nameElement = screen.getByTestId("full-name-input");
    // No error message when it's empty
    expect(nameElement).not.toHaveTextContent('At least 3 characters')

    fireEvent.change(nameInput, {target: {value: 'a'}});
    // Input fails validation
    expect(nameElement).toHaveTextContent('At least 3 characters')

    fireEvent.change(nameInput, {target: {value: 'aaa'}});
    // Input passes validation
    expect(nameElement).not.toHaveTextContent('At least 3 characters');

    const emailInput = screen.getByLabelText('Email');
    const emailElement = screen.getByTestId("email-input");
    // No error message when it's empty
    expect(emailElement).not.toHaveTextContent('Incorrect email format')

    fireEvent.change(emailInput, {target: {value: 'test'}});
    // Input fails validation
    expect(emailElement).toHaveTextContent('Incorrect email format');

    fireEvent.change(emailInput, {target: {value: 'test@airwallex.com'}});
    // Input passes validation
    expect(emailElement).not.toHaveTextContent('Incorrect email format');

    const confirmEmailInput = screen.getByLabelText('Confirm email');
    const confirmEmailElement = screen.getByTestId("confirm-email-input");
    // No error message when it's empty
    expect(confirmEmailElement).not.toHaveTextContent('Not match pre-entered email')

    fireEvent.change(confirmEmailInput, {target: {value: 'test'}});
    // Input fails validation
    expect(confirmEmailElement).toHaveTextContent('Not match pre-entered email');

    fireEvent.change(confirmEmailInput, {target: {value: 'test@airwallex.com'}});
    // Input passes validation
    expect(confirmEmailElement).not.toHaveTextContent('Not match pre-entered email');
});

test('Submits and process form properly', async() => {
    server.listen();
    const closeHandler = jest.fn();
    render(<InviteModal showModal={true} closeHandler={closeHandler}/>);

    const submitButton = screen.getByRole('button', {name: 'Send'});
    const nameInput = screen.getByLabelText('Full name');
    const emailInput = screen.getByLabelText('Email');
    const confirmEmailInput = screen.getByLabelText('Confirm email');

    // Set up failure request
    fireEvent.change(nameInput, {target: {value: 'aaa'}});
    fireEvent.change(emailInput, {target: {value: 'failure@airwallex.com'}});
    fireEvent.change(confirmEmailInput, {target: {value: 'failure@airwallex.com'}});
    fireEvent.click(submitButton);
    await screen.findByTestId("error-message");// Show error message in case of failure

    // Set up success request
    fireEvent.change(emailInput, {target: {value: 'test@airwallex.com'}});
    fireEvent.change(confirmEmailInput, {target: {value: 'test@airwallex.com'}});
    fireEvent.click(submitButton);
    await screen.findByTestId('success-modal');// Show success modal in case of success
    expect(closeHandler).toHaveBeenCalledTimes(1);// Close invite modal

    server.close();
})

// test('Shows SuccessModal when submitting form', () => {
//     const closeHandler = jest.fn();
//     render(<InviteModal showModal={true} closeHandler={closeHandler}/>);

//     const submitButton = screen.getByRole('button', {name: 'Send'});
//     userEvent.click(submitButton);
//     expect(closeHandler).toHaveBeenCalledTimes(1);
//     expect(screen.getByTestId('success-modal')).toBeInTheDocument();
// });