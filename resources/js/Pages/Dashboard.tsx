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

    React.useEffect(() => {
        // Fetch the initial list of CDs
        const fetchCds = async () => {
            try {
                const response = await axios.get('/api/cds');
                setCds(response.data.data);
            } catch (err) {
                console.error('Error fetching CDs:', err);
            }
        };

        fetchCds();
    }, []);

    const handleCDAdded = (newCD: CD) => {
        setCds([...cds, newCD]);
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
                        <CDList cds={cds} />
                    </div>
                </div>
            </AuthCheck>
            <AuthCheck permission="manage_users">
                <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                    <div className="p-6 text-black dark:text-gray-100">
                        <CDList cds={cds} />
                    </div>
                </div>
            </AuthCheck>
        </AuthenticatedLayout>
    );
}
