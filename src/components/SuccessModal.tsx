import { Dialog, DialogContentText, DialogTitle, useMediaQuery, useTheme,
    Button, makeStyles } from "@material-ui/core";

interface SuccessModalProps {
    showModal: boolean,
    closeHandler: () => void
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
    modalActions: {
        marginTop: theme.spacing(5),
    }
}));

/**
 * The modal shown after invitation request is successfully processed.
 * @param {SuccessModalProps} props 
 */
export default function SuccessModal(props: SuccessModalProps) {
    const fullScreen = useMediaQuery(useTheme().breakpoints.down('sm'));//Show modal in fullscreen when viewport is sm.
    const _classes = useStyles();
    const { showModal, closeHandler } = props;
    return (
        <Dialog className={_classes.modalContainer} fullScreen={fullScreen} open={showModal} data-testid="success-modal">
            <DialogTitle className={_classes.modalTitle} data-testid="success-modal-title">All done!</DialogTitle>
            <DialogContentText data-testid="success-modal-text">
                You will be one of the first to experience
                Broccoli &amp; Co. when we launch.
            </DialogContentText>
            <div className={_classes.modalActions}>
                <Button 
                    variant="outlined" 
                    fullWidth={true} 
                    name="ok"
                    onClick={closeHandler}
                >
                    Ok
                </Button>
            </div>
        </Dialog>
    )
}