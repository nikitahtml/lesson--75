import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField } from '@mui/material';

interface DecoderState {
    password: string;
    encodedMessage: string;
    decoded: string;
}
interface DecodeRequest {
    password: string;
    message: string;
}

interface DecodeResponse {
    decoded: string;
}

const Decoder: React.FC = () => {
    const [state, setState] = useState<DecoderState>({
        password: '',
        encodedMessage: '',
        decoded: ''
    });

    const handleDecode = async () => {
        const { password, encodedMessage } = state;
        if (!password || !encodedMessage) return;

        try {
            const response = await axios.post<DecodeResponse>('/api/decode', {
                password,
                message: encodedMessage
            } as DecodeRequest);
            setState(prevState => ({ ...prevState, decoded: response.data.decoded }));
        } catch (error) {
            console.error(error);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setState(prevState => ({ ...prevState, [name]: value }));
    };

    return (
        <div>
            <TextField
                label="Encoded Message"
                name="encodedMessage"
                value={state.encodedMessage}
                onChange={handleChange}
                fullWidth
                multiline
            />
            <TextField
                label="Password"
                name="password"
                value={state.password}
                onChange={handleChange}
                fullWidth
            />
            <Button onClick={handleDecode}>Decode</Button>
            <TextField
                label="Decoded Message"
                value={state.decoded}
                fullWidth
                multiline
                InputProps={{ readOnly: true }}
            />
        </div>
    );
};

export default Decoder;
