import { useEffect, useState } from 'react';
import { api } from '../../lib/api.js';

export default function ListingsPage() {
  const [listings, setListings] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    api('/listings')
      .then(setListings)
      .catch((e) => setError(e.message));
  }, []);

  return (
    <section>
      <h1 className="text-2xl font-bold">Subleases</h1>
      {/* TODO(filters): <ListingFilters /> for rent, commute, nearby grocery/dining */}
      {error && <p className="mt-4 text-red-600">{error}</p>}
      <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {listings.map((l) => (
          <li key={l._id} className="rounded-lg bg-white p-4 shadow">
            <h2 className="font-semibold">{l.title}</h2>
            <p className="text-sm text-gray-600">{l.address}</p>
            <p className="text-triton-blue mt-2 font-bold">${l.rent}/mo</p>
          </li>
        ))}
      </ul>
      {!error && listings.length === 0 && <p className="mt-6 text-gray-500">No listings yet.</p>}
    </section>
  );
}
