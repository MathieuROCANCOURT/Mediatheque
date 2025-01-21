import React from 'react';
import axios from 'axios';
import PrimaryButton from "./PrimaryButton";
import TextInput from "./TextInput";

interface CD {
    id: number;
    title: string;
    artist: string;
    category: string;
    year: number;
}

interface CreateCDProps {
    onCDAdded: (cd: CD) => void;
}

const CreateCD: React.FC<CreateCDProps> = ({onCDAdded: onCDAdded}: CreateCDProps) => {
    const [title, setTitle] = React.useState('');
    const [artist, setArtist] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [year, setYear] = React.useState<number>(2000);

    const handleCDClick: () => Promise<void> = async () => {
        try {
            // Send POST request to create CD
            const response = await axios.post('/api/cds', {
                title: title,
                artist: artist,
                category: category,
                year: year
            });

            // Call the callback function with the new CD data
            onCDAdded(response.data.data);

            // Clear the input fields
            setTitle('');
            setArtist('');
            setCategory('');
            setYear(2000);
        } catch (err) {
            console.error('Error creating CD:', err);
        }
    };

    const handleYearChange: (e: React.ChangeEvent<HTMLInputElement>) => void = (e) => {
        const value = e.target.value;
        if (/^\d*$/.test(value)) {
            setYear(Number(value));
        }
    };

    return (
        <div>
            Title:
            <TextInput
                placeholder="Still D.R.E."
                className="border p-2 mb-4 rounded"
                value={title}
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setTitle(e.target.value)}
            />
            Artist:
            <TextInput
                placeholder="Dr. Dre ft. Snoop Doggy Dogg"
                className="border p-2 mb-4 rounded"
                value={artist}
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setArtist(e.target.value)}
            />
            Year:
            <TextInput
                type="number"
                placeholder="Year"
                className="border p-2 mb-4 rounded"
                inputMode="numeric"
                value={year.toString()}
                onChange={handleYearChange}
                min="1800"
                max="2099"
                step="1"
            />
            Category:
            <TextInput
                placeholder="Pop"
                className="border p-2 mb-4 rounded"
                value={category}
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setCategory(e.target.value)}
            />
            <PrimaryButton onClick={handleCDClick}>
                Add CD
            </PrimaryButton>
        </div>
    );
};

export default CreateCD;
