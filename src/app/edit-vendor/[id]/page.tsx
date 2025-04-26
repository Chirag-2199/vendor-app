'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

const EditVendor = () => {
    const { id } = useParams();
    const router = useRouter();

    const [form, setForm] = useState({
        vendorName: '',
        bankAccountNo: '',
        bankName: '',
        addressLine1: '',
        addressLine2: '',
        city: '',
        country: '',
        zipCode: '',
    });

    useEffect(() => {
        const fetchVendor = async () => {
            const res = await fetch(`/api/vendors/${id}`);
            const data = await res.json();
            setForm(data.vendor);
        };

        fetchVendor();
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const res = await fetch(`/api/vendors/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(form),
        });

        if (res.ok) {
            router.push('/vendors');
        }
    };

    return (
        <main className="p-4 max-w-xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Edit Vendor</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                {Object.entries(form).map(([key, value]) => (
                    <div key={key}>
                        <label className="block text-sm font-medium capitalize">{key}</label>
                        <input
                            name={key}
                            value={value || ''}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded"
                        />
                    </div>
                ))}
                <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
                    Update Vendor
                </button>
            </form>
        </main>
    );
};

export default EditVendor;
