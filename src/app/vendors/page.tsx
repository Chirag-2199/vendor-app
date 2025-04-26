'use client'

import React, { useEffect, useState } from 'react';
import '../globals.css';


type Vendor = {
    id: number;
    vendorName: string;
    bankAccountNo: string;
    bankName: string;
    addressLine1: string | null;
    addressLine2: string | null;
    city: string | null;
    country: string | null;
    zipCode: string | null;
};

const VendorList = () => {
    const [vendors, setVendors] = useState<Vendor[]>([]);

    useEffect(() => {
        const fetchVendors = async () => {
            try {
                const response = await fetch('/api/vendors');
                if (response.ok) {
                    const data = await response.json();
                    setVendors(data.vendors);
                } else {
                    console.error('Failed to fetch vendors');
                }
            } catch (error) {
                console.error('Error fetching vendors:', error);
            }
        };

        fetchVendors();
    }, []);

    return (
        <div className="min-h-screen bg-gray-900 p-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500 animate-pulse">
                    Vendors List
                </h1>

                {vendors.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-400 text-xl">No vendors available.</p>
                    </div>
                ) : (
                    <div className="rounded-lg border border-gray-700 overflow-hidden shadow-xl">
                        <div className="overflow-x-auto">
                            <table className="min-w-full">
                                <thead className="bg-gray-800">
                                    <tr>
                                        {['Vendor Name', 'Bank Account No', 'Bank Name', 'Actions'].map((header) => (
                                            <th
                                                key={header}
                                                className="px-6 py-4 text-left text-sm font-medium text-gray-300 uppercase tracking-wider"
                                            >
                                                {header}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="bg-gray-900 divide-y divide-gray-700">
                                    {vendors.map((vendor) => (
                                        <tr key={vendor.id} className="hover:bg-gray-800 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap text-gray-300 font-medium">
                                                {vendor.vendorName}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-gray-400">
                                                {vendor.bankAccountNo}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-gray-400">
                                                {vendor.bankName}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex space-x-4">
                                                    <a
                                                        href={`/edit-vendor/${vendor.id}`}
                                                        className="text-blue-400 hover:text-blue-300 transition-colors px-4 py-2 rounded-md bg-blue-900/30 hover:bg-blue-900/50"
                                                    >
                                                        Edit
                                                    </a>
                                                    <a
                                                        href={`/delete-vendor/${vendor.id}`}
                                                        className="text-red-400 hover:text-red-300 transition-colors px-4 py-2 rounded-md bg-red-900/30 hover:bg-red-900/50"
                                                    >
                                                        Delete
                                                    </a>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default VendorList;