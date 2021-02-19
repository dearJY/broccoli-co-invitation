import { Dialog, useMediaQuery, useTheme, DialogTitle, makeStyles,
    DialogContent, TextField, Button, Typography } from "@material-ui/core";
import { ChangeEvent, useState, useEffect } from "react";
import SuccessModal from './SuccessModal';
import { sendInviteApi } from '../apis';
import { validateTextInputLength, validateEmailInput, validateConfirmInput } from '../utils/inputValidation';
import useDidUpdateEffect from '../hooks/UseDidUpdateEffect';

interface InviteModalProps {
    showModal: boolean,
    closeHandler: () => void,
}

const useStyles = makeStyles((theme) => ({
    modalContainer: {
        '& .MuiDialog-paper': {
            width: 500,
            padding: theme.spacing(3),
            '& > div': {
                padding: 0
            }
        },
    },
    modalTitle: {
        textAlign: 'center'
    },
    modalContent: {
        display: 'flex',
        flexDirection: 'column',
        '& > div': {
            marginTop: theme.spacing(2)
        }
    },
    modalActions: {
        marginTop: theme.spacing(5),
    }
}));

/**
 * Popup Modal for invitation requesting form
 * @param {InviteModalProps} props
 */
export default function InviteModal(props: InviteModalProps) {
    const _classes = useStyles();

    // Show modal in fullscreen when viewport is sm.
    const _fullScreen = useMediaQuery(useTheme().breakpoints.down('sm'));

    const {showModal, closeHandler} = props;

    // State for name input
    const [nameValue, setNameValue] = useState("");

    // If name input is valid
    const [isNameValid, setIsNameValid] = useState(true);

    // State for email input
    const [emailValue, setEmailValue] = useState("");

    // If email input is valid
    const [isEmailValid, setIsEmailValid] = useState(true);

    // State for confirm email input
    const [confirmEmailValue, setConfirmEmailValue] = useState("");

    // If confirm email input is valid
    const [isConfirmEmailValid, setIsConfirmEmailValid] = useState(true);

    // If request is processing
    const [isRequesting, setIsRequesting] = useState(false);

    // State for controlling modal appearance
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    // Error message from response
    const [errorMessage, setErrorMessage] = useState("");

    // If send button should be disabled
    const  [disableButton, setDisableButton] = useState(true);

    // Change event handler for all inputs
    const handleInputChange = (label: string, event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const { value } = event.target;
        switch(label) {
            case 'name':
                setNameValue(value);
                break;
            case 'email':
                setEmailValue(value);
                break;
            case 'confirmEmail':
                setConfirmEmailValue(value);
                break;
        }
    };

    // Event handler for closing modal by clicking backdrop
    const handleCloseInviteModal = () => {
        closeHandler();
        _cleanUpModal();
    };

    // Event handler for clicking send button to submit form
    const handleSubmitForm = () => {
        setIsRequesting(true);
        setErrorMessage("");

        sendInviteApi(nameValue, emailValue)
            .then(() => {
                handleCloseInviteModal();
                toggleSuccessModal();
            })
            .catch((error) => {
                setErrorMessage(error.message || "Unknown");
            })
            .finally(() => {
                setIsRequesting(false);
            })
    };

    // Event handler for opening and closing success modal
    const toggleSuccessModal = () => {
        setShowSuccessModal(!showSuccessModal);
    };

    // Helper function for clean up momdal to the initial state
    const _cleanUpModal = () => {
        setNameValue("");
        setEmailValue("");
        setConfirmEmailValue("");
        setErrorMessage("");
    }

    // Validate all the inputs when there is a input change.
    // NOTE: Empty input is regarded as valid to prevent showing error message
    useDidUpdateEffect(() => {
        setIsNameValid(!nameValue || validateTextInputLength(3, nameValue));
        setIsEmailValid(!emailValue || validateEmailInput(emailValue));
        setIsConfirmEmailValid(!confirmEmailValue || validateConfirmInput(emailValue, confirmEmailValue));
    }, [nameValue, emailValue, confirmEmailValue])

    // Disable or enable send button when related states get changed.
    // Conditions for disabling button:
    // 1. Request is processing; 2. There is a empty input; 3. There is an invalid input.
    useEffect(() => {
        const hasEmptyInput = [nameValue, emailValue, confirmEmailValue].some((input) => !input);
        const disableButton = isRequesting || hasEmptyInput || !isNameValid || !isEmailValid || !isConfirmEmailValid;
        setDisableButton(disableButton);
    }, [nameValue, emailValue, confirmEmailValue, isNameValid, isEmailValid, isConfirmEmailValid, isRequesting])

    return (
        <div>
            <Dialog 
                className={_classes.modalContainer} 
                fullScreen={_fullScreen} 
                open={showModal} 
                onClose={handleCloseInviteModal} 
                data-testid="invite-modal"
                disableBackdropClick={isRequesting}
            >
                <DialogTitle className={_classes.modalTitle} data-testid="invite-modal-title">Request an invite</DialogTitle>
                <DialogContent className={_classes.modalContent} data-testid="invite-modal-form">
                        <TextField
                            data-testid="full-name-input"
                            id="full-name-input"
                            variant="outlined"
                            label="Full name"
                            type="text"
                            value={nameValue}
                            error={!isNameValid}
                            helperText={isNameValid ? '' : 'At least 3 characters'}
                            onChange={(e) => handleInputChange('name', e)}
                        />
                        <TextField
                            data-testid="email-input"
                            id="email-input"
                            variant="outlined"
                            label="Email"
                            type="email"
                            value={emailValue}
                            error={!isEmailValid}
                            helperText={isEmailValid ? '' : 'Incorrect email format'}
                            onChange={(e) => handleInputChange('email', e)}
                        />
                        <TextField
                            data-testid="confirm-email-input"
                            id="confirm-email-input"
                            variant="outlined"
                            label="Confirm email"
                            type="email"
                            value={confirmEmailValue}
                            error={!isConfirmEmailValid}
                            helperText={isConfirmEmailValid ? '' : 'Not match pre-entered email'}
                            onChange={(e) => handleInputChange('confirmEmail', e)}
                        />
                </DialogContent>
                <div className={_classes.modalActions}>
                    <Button 
                        variant="contained" 
                        color="primary" 
                        fullWidth={true} 
                        name="submit"
                        disabled={disableButton}
                        onClick={handleSubmitForm}
                    >
                            {isRequesting ?  'Sending, please wait...' : 'Send'}
                    </Button>
                </div>
                { errorMessage && 
                    <Typography variant="body2" color="error" data-testid="error-message">
                        Error: {errorMessage}. Please try again or contact <a href="mailto: support@airwallex.com">support@airwallex.com</a> for help.
                    </Typography> 
                }
            </Dialog>
            <SuccessModal showModal={showSuccessModal} closeHandler={toggleSuccessModal}/>
        </div>
    );
}