import React from 'react';
import AuthenticatedLayout from '../Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import CDList from "../Components/CDList";
import AuthCheck from "../Components/AuthCheck";
import CreateCD from "../Components/CreateCD";
import axios from 'axios';

interface CD {
    id: number;
    title: string;
    artist: string;
    category: string;
    year: number;
}

export default function Dashboard() {
    const [cds, setCds] = React.useState<CD[]>([]);

    // Show all CD except if CD are in loan
    React.useEffect((): void => {
        const fetchCDs = async () => {
            try {
                // Fetch both resources
                const [cdResponse, loanResponse] = await Promise.all([
                    axios.get('http://localhost:8000/api/cds'),
                    axios.get('http://localhost:8000/api/loans')
                ]);

                const allCDs: CD[] = cdResponse.data.data;
                const loanedCDs: [{id: number, cd_id:number, user_id:number, loan_date: Date, return_date: Date}] = loanResponse.data.data;

                // Filter out CDs that are currently loaned
                const availableCDs = allCDs.filter(cd => {
                    return !loanedCDs.some((loan: {
                            id: number;
                            cd_id: number;
                            user_id: number;
                            loan_date: Date;
                            return_date: Date
                        }): boolean =>
                        // Assuming cd_ids could be array or single value
                        Array.isArray(loan.cd_id)
                            ? loan.cd_id.includes(cd.id)
                            : loan.cd_id === cd.id
                    );
                });

                setCds(availableCDs);

            } catch (err: any) {
                // More specific error handling
                if (err.response) {
                    console.error(`Server error: ${err.response.status}`);
                } else if (err.request) {
                    console.error('Network error - no response received');
                } else {
                    console.error(`Error: ${err.message}`);
                }
                console.error('Error fetching data:', err);
            }
        };

        fetchCDs();
    }, []);

    const handleCDAdded: (newCD: CD) => void = (newCD: CD) => {
        setCds([...cds, newCD]);
    };

    const handleCDDeleted: (deletedIds: number[]) => void = (deletedIds: number[]) => {
        setCds(cds.filter((cd: CD): boolean => !deletedIds.includes(cd.id)));
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-black dark:text-white">
                    CD list available can be loans
                </h2>
            }
        >
            <Head title="CD available" />

            <AuthCheck permission="manage_admin">
                <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                    <div className="p-6 text-black dark:text-gray-100">
                        <CreateCD onCDAdded={handleCDAdded} />
                        <CDList cds={cds} onCDDeleted={handleCDDeleted} isAdmin={true} />
                    </div>
                </div>
            </AuthCheck>
            <AuthCheck permission="manage_users">
                <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                    <div className="p-6 text-black dark:text-gray-100">
                        <CDList cds={cds} onCDDeleted={handleCDDeleted} isAdmin={false} />
                    </div>
                </div>
            </AuthCheck>
        </AuthenticatedLayout>
    );
}
