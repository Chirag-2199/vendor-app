import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const [rows]: any = await db.execute('SELECT * FROM vendor WHERE id = ?', [params.id]);
        if (rows.length === 0) {
            return NextResponse.json({ error: 'Vendor not found' }, { status: 404 });
        }

        return NextResponse.json({ vendor: rows[0] });
    } catch (error: any) {
        return NextResponse.json({ error: 'Failed to get vendor', details: error.message }, { status: 500 });
    }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
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

        await db.execute(
            `UPDATE vendor SET vendorName = ?, bankAccountNo = ?, bankName = ?, addressLine1 = ?, addressLine2 = ?, city = ?, country = ?, zipCode = ? WHERE id = ?`,
            [vendorName, bankAccountNo, bankName, addressLine1, addressLine2, city, country, zipCode, params.id]
        );

        return NextResponse.json({ message: 'Vendor updated successfully' }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: 'Failed to update vendor', details: error.message }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        await db.execute('DELETE FROM vendor WHERE id = ?', [params.id]);
        return NextResponse.json({ message: 'Vendor deleted successfully' });
    } catch (error: any) {
        return NextResponse.json({ error: 'Failed to delete vendor', details: error.message }, { status: 500 });
    }
}
