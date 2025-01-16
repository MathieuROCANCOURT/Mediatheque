import React, {useState, useEffect} from 'react';
import axios from 'axios';

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

    useEffect(() => {
        const fetchCDs = async () => {
            try {
                // Use the correct base URL
                const response = await axios.get('http://localhost:8000/api/cds');
                setCds(response.data.data);
            } catch (err) {
                setError('Error fetching CDs');
                console.error('Error fetching data:', err);
            }
        };

        fetchCDs();
    }, []);

    const filteredCds = cds.filter(cd =>
        cd.artist.toLowerCase().includes(filter.toLowerCase()) ||
        cd.category.toLowerCase().includes(filter.toLowerCase())
    );

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
                    <thead className={"text-xl text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"}>
                    <tr>
                        <th scope="col" className="p-4">
                            <div className="flex items-center">
                                <input id="checkbox-all-search" type="checkbox"
                                       className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                <label htmlFor="checkbox-all-search" className="sr-only" />
                            </div>
                        </th>
                        <th scope="col" className={"px-6 py-3"}>Title</th>
                        <th scope="col" className={"px-6 py-3"}>Artist</th>
                        <th scope="col" className={"px-6 py-3"}>Category</th>
                    </tr>
                    </thead>
                    <tbody className={"bg-indigo-50 "}>
                    {filteredCds.map(cd => (
                        <tr key={cd.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <td className="w-4 p-4">
                                <div className="flex items-center">
                                    <input id="checkbox-table-search-1" type="checkbox"
                                           className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                    <label htmlFor="checkbox-table-search-1" className="sr-only">checkbox</label>
                                </div>
                            </td>
                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{cd.title}</td>
                            <td className={"px-6 py-4"}>{cd.artist}</td>
                            <td className={"px-6 py-4"}>{cd.category}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default CDList;
