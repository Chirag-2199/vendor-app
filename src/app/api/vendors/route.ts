import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
    try {
        const [vendors]: any = await db.execute('SELECT * FROM vendor');
        return NextResponse.json({ vendors });
    } catch (error: any) {
        console.error('🔥 GET ERROR:', error);
        return NextResponse.json({ error: 'Failed to fetch vendors', details: error.message }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const {
            vendorName,
            bankAccountNo,
            bankName,
            addressLine1,
            addressLine2,
            city,
            country,
            zipCode,
        } = body;

        if (!vendorName || !bankAccountNo || !bankName) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const [result]: any = await db.execute(
            `INSERT INTO vendor (vendorName, bankAccountNo, bankName, addressLine1, addressLine2, city, country, zipCode)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [vendorName, bankAccountNo, bankName, addressLine1, addressLine2, city, country, zipCode]
        );

        return NextResponse.json({ message: 'Vendor created', id: result.insertId }, { status: 201 });

    } catch (error: any) {
        console.error('🔥 POST ERROR:', error);
        return NextResponse.json({ error: 'Failed to create vendor', details: error.message }, { status: 500 });
    }
}
