'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import '../../globals.css';

export default function CreateVendor() {
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const res = await fetch('http://localhost:3000/api/vendors', {
            method: 'POST',
            body: JSON.stringify(form),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (res.ok) {
            router.push('/vendors');
        }
    };

    return (
        <main className="min-h-screen bg-gray-900 p-8">
            <div className="max-w-2xl mx-auto">
                <div className="mb-10">
                    <h1 className="text-3xl font-bold text-center mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">
                        Create New Vendor
                    </h1>
                    <p className="text-center text-gray-400">Please fill in the vendor details below</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6 bg-gray-800 p-8 rounded-xl shadow-2xl border border-gray-700">
                    {[
                        ['vendorName', 'Vendor Name *'],
                        ['bankAccountNo', 'Bank Account No *'],
                        ['bankName', 'Bank Name *'],
                        ['addressLine1', 'Address Line 1'],
                        ['addressLine2', 'Address Line 2'],
                        ['city', 'City'],
                        ['country', 'Country'],
                        ['zipCode', 'Zip Code'],
                    ].map(([name, label]) => {
                        const isRequired = label.includes('*');
                        const displayLabel = label.replace(' *', '');

                        return (
                            <div key={name}>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    {displayLabel}
                                    {isRequired && <span className="text-red-400 ml-1">*</span>}
                                </label>
                                <input
                                    required={isRequired}
                                    name={name}
                                    value={form[name as keyof typeof form]}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-100 placeholder-gray-400 transition-all"
                                    placeholder={`Enter ${displayLabel.toLowerCase()}`}
                                />
                            </div>
                        )
                    })}

                    <div className="flex justify-end gap-4 mt-8">
                        <button
                            type="button"
                            onClick={() => router.push('/vendors')}
                            className="px-6 py-2.5 text-gray-300 hover:text-white border border-gray-600 rounded-lg hover:bg-gray-700 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-medium hover:shadow-lg transition-all"
                        >
                            Save Vendor
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
}