import React, { useState, FormEvent } from 'react';
import axios from 'axios';

const CreateLoan: React.FC = () => {
    const [cdId, setCdId] = useState<string>('');
    const [clientId, setClientId] = useState<string>('');

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        axios.post('/api/loans', { cd_id: cdId, client_id: clientId, loan_date: new Date() })
            .then(response => {
                alert('Loan created successfully');
            })
            .catch(error => {
                console.error('There was an error creating the loan!', error);
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={cdId} onChange={e => setCdId(e.target.value)} placeholder="CD ID" />
            <input type="text" value={clientId} onChange={e => setClientId(e.target.value)} placeholder="Client ID" />
            <button type="submit">Create Loan</button>
        </form>
    );
};

export default CreateLoan;
