import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '../Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import CDList from "../Components/CDList";

export default function Dashboard() {

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                <div className="p-6 text-gray-900 dark:text-gray-100">
                    You're logged in!
                    Je suis rentré!! AHAAGH.
                </div>
                <div className="p-6 text-gray-900 dark:text-gray-100">
                    <h3 className="text-lg font-semibold">CD Data:</h3>
                    <CDList />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
