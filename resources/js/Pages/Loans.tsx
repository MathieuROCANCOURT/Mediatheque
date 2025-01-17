import React, { useEffect, useState } from 'react';
import AuthenticatedLayout from '../Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import axios from 'axios';

interface Loan {
    id: number;
    cd: {
        id: number;
        title: string;
        artist: string;
    };
    user: {
        id: number;
        name: string;
    };
    loan_date: string;
    return_date: string | null;
}

export default function Loans() {
    const [loans, setLoans] = useState<Loan[]>([]);
    const [error, setError] = useState<string>('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchLoans = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/loans');
                setLoans(response.data.data);
            } catch (err) {
                console.error('Error fetching loans:', err);
                setError('Failed to load loans');
            } finally {
                setIsLoading(false);
            }
        };

        fetchLoans();
    }, []);

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Loans
                </h2>
            }
        >
            <Head title="Loans" />

            <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                <div className="p-6 text-gray-900 dark:text-gray-100">
                    <h2 className="text-lg font-semibold mb-4">Active Loans</h2>

                    {error && <div className="text-red-500 mb-4">{error}</div>}

                    {isLoading ? (
                        <p>Loading loans...</p>
                    ) : (
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xl text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">CD Title</th>
                                <th scope="col" className="px-6 py-3">Artist</th>
                                <th scope="col" className="px-6 py-3">Client</th>
                                <th scope="col" className="px-6 py-3">Loan Date</th>
                                <th scope="col" className="px-6 py-3">Status</th>
                            </tr>
                            </thead>
                            <tbody>
                            {loans.map(loan => (
                                <tr key={loan.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {loan.cd.title}
                                    </td>
                                    <td className="px-6 py-4">{loan.cd.artist}</td>
                                    <td className="px-6 py-4">{loan.user.name}</td>
                                    <td className="px-6 py-4">{new Date(loan.loan_date).toLocaleDateString()}</td>
                                    <td className="px-6 py-4">
                                        {loan.return_date ? 'Returned' : 'Active'}
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
