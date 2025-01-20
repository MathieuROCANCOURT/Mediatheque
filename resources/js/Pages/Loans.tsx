import React, { useEffect, useState } from 'react';
import AuthenticatedLayout from '../Layouts/AuthenticatedLayout';
import {Head} from '@inertiajs/react';
import axios from 'axios';
import PrimaryButton from "../Components/PrimaryButton";

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
    return_date: string;
}

export default function Loans() {
    const [loans, setLoans] = useState<Loan[]>([]);
    const [error, setError] = useState<string>('');
    const [selectedItems, setSelectedItems] = useState<Set<number>>(new Set());
    const [isLoading, setIsLoading] = useState(false);

    const isAllSelected = selectedItems.size === loans.length;
    const isPartiallySelected = 0 < selectedItems.size && selectedItems.size < loans.length;


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

    /**
     * Select or deselect all checkboxes
     */
    const handleSelectAll: () => void = (): void => {
        if (selectedItems.size >= 1) {
            // If all items are selected, deselect all
            setSelectedItems(new Set());
        } else {
            // Otherwise, select all filtered items
            setSelectedItems(new Set(loans.map((loan : Loan) => loan.id)));
        }
    };

    const handleSelectItem: (id: number) => void = (id: number): void => {
        const newSelectedItems = new Set(selectedItems);
        if (selectedItems.has(id)) {
            newSelectedItems.delete(id);
        } else {
            newSelectedItems.add(id);
        }
        setSelectedItems(newSelectedItems);
    };

    const handleReturnCDClick: () => Promise<void> = async (): Promise<void> => {
        setIsLoading(true);
        try {
            // Get the selected CD IDs
            const selectedCDIds: number[] = Array.from(selectedItems);

            // Send POST request to resend CD in market
            await axios.post('/api/cds', {
                cd_ids: selectedCDIds
            });

            // If successful, navigate to loans page
            //router.visit('/loans');

        } catch (err) {
            console.error('Error creating CDs:', err);
            setError('Failed to create CDs');
        } finally {
            setIsLoading(false);
        }
    };

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
                                <th scope="col" className="p-4">
                                    <div className="flex items-center">
                                        <input
                                            id="checkbox-all-search"
                                            type="checkbox"
                                            checked={isAllSelected}
                                            ref={input => {
                                                if (input) {
                                                    input.indeterminate = isPartiallySelected;
                                                }
                                            }}
                                            onChange={handleSelectAll}
                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                        />
                                        <label htmlFor="checkbox-all-search" className="sr-only">checkbox</label>
                                    </div>
                                </th>
                                <th scope="col" className="px-6 py-3">CD Title</th>
                                <th scope="col" className="px-6 py-3">Artist</th>
                                <th scope="col" className="px-6 py-3">Client</th>
                                <th scope="col" className="px-6 py-3">Loan Date</th>
                                <th scope="col" className="px-6 py-3">Status</th>
                            </tr>
                            </thead>
                            <tbody>
                            {loans.map((loan: Loan) => (
                                <tr key={loan.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <td className="w-4 p-4">
                                        <div className="flex items-center">
                                            <input
                                                id={`checkbox-${loan.id}`}
                                                type="checkbox"
                                                checked={selectedItems.has(loan.id)}
                                                onChange={() => handleSelectItem(loan.id)}
                                            />
                                            <label htmlFor={`checkbox-${loan.id}`} className="sr-only">checkbox</label>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {loan.cd.title}
                                    </td>
                                    <td className="px-6 py-4">{loan.cd.artist}</td>
                                    <td className="px-6 py-4">{loan.user.name}</td>
                                    <td className="px-6 py-4">{new Date(loan.loan_date).toLocaleDateString()}</td>
                                    <td className="px-6 py-4">
                                        {new Date(loan.return_date).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    )}
                    <div className="text-center">
                        <PrimaryButton
                            onClick={handleReturnCDClick}
                            disabled={selectedItems.size === 0 || isLoading}
                            className="text-black bg-blue-400 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        >
                            {isLoading ? 'Processing...' : `Return CD (${selectedItems.size} selected)`}
                        </PrimaryButton>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
