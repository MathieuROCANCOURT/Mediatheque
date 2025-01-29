import React from 'react';
import TextInput from "./TextInput";
import PrimaryButton from "./PrimaryButton";
import axios from "axios";
import {router} from "@inertiajs/react";

interface CD {
    id: number;
    title: string;
    artist: string;
    category: string;
    year: number;
}

interface CDListProps {
    cds: CD[];
    onCDDeleted: (deletedIds: number[]) => void;
    isAdmin: boolean;
}

const CDList: React.FC<CDListProps> = ({cds, onCDDeleted, isAdmin}: CDListProps) => {
    const [filter, setFilter] = React.useState<string>('');
    const [selectedItems, setSelectedItems] = React.useState<Set<number>>(new Set());
    const [isLoading, setIsLoading] = React.useState(false);

    const filteredCds: CD[] = cds.filter((cd: CD): boolean =>
        cd.artist.toLowerCase().includes(filter.toLowerCase()) ||
        cd.category.toLowerCase().includes(filter.toLowerCase())
    );
    const isAllSelected = filteredCds.length > 0 && selectedItems.size === filteredCds.length;
    const isPartiallySelected = selectedItems.size > 0 && selectedItems.size < filteredCds.length;

    const handleSelectAll = () => {
        if (selectedItems.size >= 1) {
            // If all items are selected, deselect all
            setSelectedItems(new Set());
        } else {
            // Otherwise, select all filtered items
            setSelectedItems(new Set(filteredCds.map((cd: CD) => cd.id)));
        }
    };

    const handleSelectItem = (id: number) => {
        const newSelectedItems = new Set(selectedItems);
        if (selectedItems.has(id)) {
            newSelectedItems.delete(id);
        } else {
            newSelectedItems.add(id);
        }
        setSelectedItems(newSelectedItems);
    };

    const handleLoanClick: () => Promise<void> = async (): Promise<void> => {
        setIsLoading(true);
        try {
            // Get the selected CD IDs
            const selectedCDIds: number[] = Array.from(selectedItems);

            // Send POST request to create loans for each selected CD
            await axios.post('/api/loans', {
                cd_ids: selectedCDIds
            });

            // If successful, navigate to loans page
            router.visit('/loans');

        } catch (err) {
            console.error('Error creating loans:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteClick: () => Promise<void> = async () => {
        setIsLoading(true);
        try {
            // Get the selected CD IDs
            const selectedCDIds: number[] = Array.from(selectedItems);

            // Send DELETE request to delete selected CDs
            await axios.delete('/api/cds', {
                data: {ids: selectedCDIds}
            });

            // Call the callback function with the deleted CD IDs
            onCDDeleted(selectedCDIds);

            // Clear the selected items
            setSelectedItems(new Set());
        } catch (err) {
            console.error('Error deleting CDs:', err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <TextInput
                type="text"
                value={filter}
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setFilter(e.target.value)}
                placeholder="Filter by author or category"
                className="border p-2 mb-4 rounded"
            />
            {cds.length === 0 ? (
                <p>Nothing CD</p>
            ) : (
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xl text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="p-4">
                            <div className="flex items-center">
                                <input
                                    id="checkbox-all-search"
                                    type="checkbox"
                                    checked={isAllSelected}
                                    ref={(input: HTMLInputElement | null) => {
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
                        <th scope="col" className="px-14 py-3">Title</th>
                        <th scope="col" className="px-14 py-3">Artist</th>
                        <th scope="col" className="px-2 py-3">Category</th>
                        <th scope="col" className="px-2 py-3">Year</th>
                    </tr>
                    </thead>
                    <tbody className="bg-indigo-50">
                    {filteredCds.map((cd: CD) => (
                        <tr key={cd.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <td className="w-4 p-4">
                                <div className="flex items-center">
                                    <input
                                        id={`checkbox-${cd.id}`}
                                        type="checkbox"
                                        checked={selectedItems.has(cd.id)}
                                        onChange={() => handleSelectItem(cd.id)}
                                    />
                                    <label htmlFor={`checkbox-${cd.id}`} className="sr-only">checkbox</label>
                                </div>
                            </td>
                            <td className="px-14 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{cd.title}</td>
                            <td className="px-14 py-4">{cd.artist}</td>
                            <td className="px-2 py-4">{cd.category}</td>
                            <td className="px-2 py-4">{cd.year}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
            <div className="text-center">
                {isAdmin && (
                    <div className="text-center">
                        <PrimaryButton
                            onClick={handleDeleteClick}
                            disabled={selectedItems.size === 0 || isLoading}
                            className="mt-4 text-black bg-red-400 border-gray-300 rounded focus:ring-red-500 dark:focus:ring-red-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        >
                            {isLoading ? 'Processing...' : `Delete (${selectedItems.size} selected)`}
                        </PrimaryButton>
                    </div>
                )}
                <PrimaryButton
                    onClick={handleLoanClick}
                    disabled={selectedItems.size === 0 || isLoading}
                    className="mt-4 text-black bg-blue-400 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                >
                    {isLoading ? 'Processing...' : `Loans (${selectedItems.size} selected)`}
                </PrimaryButton>
            </div>
        </div>
    );
};

export default CDList;
