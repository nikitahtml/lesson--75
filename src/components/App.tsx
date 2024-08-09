import React from 'react';
import Encoder from './Encoder';
import Decoder from './Decoder';
import { Container, Typography } from '@mui/material';

const App: React.FC = () => {
    return (
        <Container>
            <Typography variant="h4">Vigenère Cipher</Typography>
            <Encoder />
            <Decoder />
        </Container>
    );
};

export default App;