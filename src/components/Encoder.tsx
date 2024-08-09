import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField } from '@mui/material';

interface EncoderState {
    password: string;
    message: string;
    encoded: string;
}

interface EncodeRequest {
    password: string;
    message: string;
}

interface EncodeResponse {
    encoded: string;
}

const Encoder: React.FC = () => {
    const [state, setState] = useState<EncoderState>({
        password: '',
        message: '',
        encoded: ''
    });

    const handleEncode = async () => {
        const { password, message } = state;
        if (!password || !message) return;

        try {
            const response = await axios.post<EncodeResponse>('/api/encode', {
                password,
                message
            } as EncodeRequest);
            setState(prevState => ({ ...prevState, encoded: response.data.encoded }));
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
                label="Message"
                name="message"
                value={state.message}
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
            <Button onClick={handleEncode}>Encode</Button>
            <TextField
                label="Encoded Message"
                value={state.encoded}
                fullWidth
                multiline
                InputProps={{ readOnly: true }}
            />

        </div>
    );
};

export default Encoder;
