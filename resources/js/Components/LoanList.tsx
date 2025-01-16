import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Loan {
    id: number;
    cd: {
        title: string;
    };
    client: {
        name: string;
    };
}

const LoanList: React.FC = () => {
    const [loans, setLoans] = useState<Loan[]>([]);

    useEffect(() => {
        axios.get<Loan[]>('/api/loans').then(response => {
            setLoans(response.data);
        });
    }, []);

    return (
        <ul>
            {loans.map(loan => (
                <li key={loan.id}>{loan.cd.title} - {loan.client.name}</li>
            ))}
        </ul>
    );
};

export default LoanList;
