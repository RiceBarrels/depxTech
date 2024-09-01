'use client';
import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then((res) => res.text())

export default function DisplayInfo({ itemId }) {
  
    const { data: itemInfo, error } = useSWR(`https://api.depxtech.com/read?filter_id=${itemId}`, fetcher)

    if (error) return <p>Failed to load information</p>;
    if (!itemInfo) return <p>Loading...</p>;

    return (
        <div>
            <h2>{itemInfo}</h2>
            {/* Add more fields as needed */}
        </div>
    );
}
