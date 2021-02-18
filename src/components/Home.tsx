import { Container, makeStyles, Typography } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import * as React from 'react';
import MainPage from './MainPage';

const useStyles = makeStyles((theme) => ({
    brand: {
        fontWeight: 'bold'
    },
    app: {
        display: 'flex',
        flexDirection: 'column',
        color: grey[900],
        height: '100%'
    },
    appBar: {
        backgroundColor: grey[300],
        padding: theme.spacing(4, 24),
        margin: 0,
        maxWidth: '100%'
    },
    appContent: {
        flex: 1,
        overflow: 'auto' 
    },
    appFooter: {
        textAlign: 'center'
    }
}));

export default function Home() {
    const _classes: Record<string, string> = useStyles();
    return (
        <div className={_classes.app}>
            <Container className={_classes.appBar} data-testid="home-header">
                <Typography variant="h5" color="inherit" className={_classes.brand}>
                    BROCCOLI &amp; CO.
                </Typography>
            </Container>
            <main className={_classes.appContent}>
                <MainPage />
            </main>
            <Container className={`${_classes.appFooter} ${_classes.appBar}`} data-testid="home-footer">
                <Typography variant="body1">Made with love in Melbourne.</Typography>
                <Typography variant="body1">2021 Broccoli &amp; CO. All rights reserved</Typography>
            </Container>
        </div>
    )
}