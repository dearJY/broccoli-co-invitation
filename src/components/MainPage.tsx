import { Button, makeStyles, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import InviteModal from './InviteModal';

const useStyles = makeStyles((theme) => ({
    mainPage: {
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    inviteContainer: {
        textAlign: 'center',
        '& > *:not(:first-child)': {
            marginTop: theme.spacing(2)
        }
    }
}));

export default function MainPage() {
    const _classes: Record<string, string> = useStyles();
    const [showModal, setShowModal] = useState(false);

    const handleToggleModal = () => {
        setShowModal(!showModal);
    };

    return (
        <div className={_classes.mainPage}>
            <div className={_classes.inviteContainer} data-testid="inivite-container">
                <div>
                    <Typography variant="h2">A better way</Typography>
                    <Typography variant="h2">to enjoy every day</Typography>
                </div>
                <Typography variant="body1">Be the first to know when we launch</Typography>
                <Button variant="outlined" color="primary" onClick={handleToggleModal}>Request an invite</Button>
            </div>

            <InviteModal 
                showModal={showModal}
                closeHandler={handleToggleModal}
            />
        </div>
    )
}