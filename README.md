# Broccoli&Co. Invitation Requesting Page

A web application for people requesting invitations from Broccoli&Co.

## Available Scripts

### Installation

* Clone this repo
* `yarn install`

### Running

* `yarn start`
* Go to `http://localhost:3000` to view the page in the browser

### Testing

* `yarn test`

## Functionality Overview

The example application is a invitation website for an upcoming company. It uses a custom API
for all invitaion requests.

### UI Workflow

- Pop up modal with invitation form when clicking request button in the main page.
- Click dropback to close the invitation form modal.
- When the user type in invitation form, validate all inputs(name, email, confirm email):
    - Name value should be at least 3 characters long.
    - Email value should be in standard email format.
    - Confirm email value should be the same as email value.
    - NOTE: Empty value for all the inputs are regarded as valid in logic to prevent warning.
- Notify the user when the input value fails the validation by highlighting the input box and showing helper text.
- Disable the send button when there is an empty or invalid input.
- After submitting the request, disable the button, show loading message in the button, and disable dropback click which closes the invitation modal.
- Request timeout is 10s.
- If the request fails, show error message at the bottom of the invitation modal;
- If the request succeeds, dismiss the invitation modal and pop up the success modal.
- Close success modal by clicking "Ok" button in it. 

