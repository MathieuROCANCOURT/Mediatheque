import React from 'react';
import axios from 'axios';

const LoanList = () => {
    const [loans, setLoans] = React.useState([]);

    React.useEffect(() => {
        axios.get('/api/loans').then(response => {
            setLoans(response.data);
        });
    }, []);

    return (
        <ul>
            {loans.map(loan => (
                <li key={loan.id}>CD: {loan.cd_id}, Client: {loan.client_id}, Date de prêt: {loan.loan_date}, Date de
                    retour: {loan.return_date}</li>
            ))}
        </ul>
    );
};

export default LoanList;
