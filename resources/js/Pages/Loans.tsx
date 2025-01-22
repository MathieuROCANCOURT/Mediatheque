import React from 'react';
import AuthenticatedLayout from '../Layouts/AuthenticatedLayout';
import {Head, usePage} from '@inertiajs/react';
import axios from 'axios';
import PrimaryButton from "../Components/PrimaryButton";
import AuthCheck from "../Components/AuthCheck";
import {PageProps, User} from "../types";

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
    const {auth} = usePage<PageProps>().props;
    const currentUser: User = auth.user as User;

    const [loans, setLoans] = React.useState<Loan[]>([]);
    const [error, setError] = React.useState<string>('');
    const [selectedItems, setSelectedItems] = React.useState<Set<number>>(new Set());
    const [isLoading, setIsLoading] = React.useState(false);

    const isAllSelected: boolean = selectedItems.size === loans.length;
    const isPartiallySelected: boolean = 0 < selectedItems.size && selectedItems.size < loans.length;


    React.useEffect(() => {
        const fetchLoans = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/loans');
                // If user has admin permission, show all loans
                // Otherwise, filter loans for current user
                const allLoans: Loan[] = response.data.data;
                const filteredLoans: Loan[] = currentUser.permissions[0].includes('manage_admin')
                    ? allLoans
                    : allLoans.filter((loan: Loan) => loan.user.id === currentUser.id);

                setLoans(filteredLoans);
            } catch (err) {
                console.error('Error fetching loans:', err);
                setError('Failed to load loans');
            } finally {
                setIsLoading(false);
            }
        };

        fetchLoans();
    }, [currentUser]);

    /**
     * Select or deselect all checkboxes
     */
    const handleSelectAll: () => void = (): void => {
        if (selectedItems.size >= 1) {
            // If all items are selected, deselect all
            setSelectedItems(new Set());
        } else {
            // Otherwise, select all filtered items
            setSelectedItems(new Set(loans.map((loan: Loan) => loan.id)));
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
            await axios.post('/api/loans/return', {
                cd_ids: selectedCDIds
            });

            // If successful, update the loans state to remove the returned loans
            setLoans(loans.filter((loan: Loan): boolean => !selectedItems.has(loan.id)));
            setSelectedItems(new Set());

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
                    {currentUser.permissions[0].includes('manage_admin') ? 'All Loans' : 'My Loans'}
                </h2>
            }
        >
            <Head title="Loans"/>

            <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                <div className="p-6 text-gray-900 dark:text-gray-100">
                    {error && <div className="text-red-500 mb-4">{error}</div>}

                    {isLoading ? (
                        <p>Loading loans...</p>
                    ) : (
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead
                                className="text-xl text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
                                {currentUser.permissions[0].includes('manage_admin') && (
                                    <th scope="col" className="px-6 py-3">Client</th>
                                )}
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
                                            <label htmlFor={`checkbox-${loan.id}`}
                                                   className="sr-only">checkbox</label>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {loan.cd.title}
                                    </td>
                                    <td className="px-6 py-4">{loan.cd.artist}</td>
                                    {currentUser.permissions[0].includes('manage_admin') && (
                                        <td className="px-6 py-4">{loan.user.name}</td>
                                    )}
                                    <td className="px-6 py-4">{new Date(loan.loan_date).toLocaleDateString()}</td>
                                    <td className="px-6 py-4">
                                        {new Date(loan.loan_date).toLocaleDateString() < new Date(loan.return_date).toLocaleDateString() ? "Active" : "Overdue"}
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    )}
                    <div className="text-center mt-4">
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
