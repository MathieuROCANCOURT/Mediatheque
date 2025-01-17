import React, {useState, useEffect} from 'react';
import axios from 'axios';
import PrimaryButton from "./PrimaryButton";

interface CD {
    id: number;
    title: string;
    artist: string;
    category: string;
}

const CDList: React.FC = () => {
    const [cds, setCds] = useState<CD[]>([]);
    const [filter, setFilter] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [selectedItems, setSelectedItems] = useState<Set<number>>(new Set());
    const [isLoading, setIsLoading] = useState(false);

    const filteredCds: CD[] = cds.filter((cd: CD): boolean =>
        cd.artist.toLowerCase().includes(filter.toLowerCase()) ||
        cd.category.toLowerCase().includes(filter.toLowerCase())
    );
    const isAllSelected = filteredCds.length > 0 && selectedItems.size === filteredCds.length;
    const isPartiallySelected = selectedItems.size > 0 && selectedItems.size < filteredCds.length;

    useEffect(() => {
        const fetchCDs = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/cds');
                setCds(response.data.data);
            } catch (err) {
                setError('Error fetching CDs');
                console.error('Error fetching data:', err);
            }
        };

        fetchCDs();
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
            setSelectedItems(new Set(filteredCds.map(cd => cd.id)));
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
            setError('Failed to create loans');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            {error && <div className="text-red-500">{error}</div>}
            <input
                type="text"
                value={filter}
                onChange={e => setFilter(e.target.value)}
                placeholder="Filter by author or category"
                className="border p-2 mb-4 rounded"
            />
            {cds.length === 0 ? (
                <p>Loading CDs...</p>
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
                        <th scope="col" className="px-6 py-3">Title</th>
                        <th scope="col" className="px-6 py-3">Artist</th>
                        <th scope="col" className="px-6 py-3">Category</th>
                    </tr>
                    </thead>
                    <tbody className="bg-indigo-50">
                    {filteredCds.map(cd => (
                        <tr key={cd.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <td className="w-4 p-4">
                                <div className="flex items-center">
                                    <input
                                        id={`checkbox-${cd.id}`}
                                        type="checkbox"
                                        checked={selectedItems.has(cd.id)}
                                        onChange={() => handleSelectItem(cd.id)}
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    />
                                    <label htmlFor={`checkbox-${cd.id}`} className="sr-only">checkbox</label>
                                </div>
                            </td>
                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{cd.title}</td>
                            <td className="px-6 py-4">{cd.artist}</td>
                            <td className="px-6 py-4">{cd.category}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
            <div className="text-center">
                <PrimaryButton
                    onClick={handleLoanClick}
                    disabled={selectedItems.size === 0 || isLoading}
                >
                    {isLoading ? 'Processing...' : `Loans (${selectedItems.size} selected)`}
                </PrimaryButton>
            </div>
        </div>
    );
};

export default CDList;
