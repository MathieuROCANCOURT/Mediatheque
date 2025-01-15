import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CDList = () => {
    const [cds, setCds] = useState([]);
    const [filter, setFilter] = useState('');

    useEffect(() => {
        axios.get('/api/cds').then(response => {
            setCds(response.data);
        });
    }, []);

    const filteredCds = cds.filter(cd => cd.artist.includes(filter) || cd.category.includes(filter));

    return (
        <div>
            <input type="text" placeholder="Filtrer par auteur ou catégorie" onChange={e => setFilter(e.target.value)} />
            <ul>
                {filteredCds.map(cd => (
                    <li key={cd.id}>{cd.title} - {cd.artist} ({cd.category})</li>
                ))}
            </ul>
        </div>
    );
};

export default CDList;
