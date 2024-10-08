import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        const { fname, lname, email, password ,image } = await req.json();

        if (!fname || !lname || !email || !password) {
            return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
        }

        const user = await prisma.user.create({
            data: {
                name: `${fname} ${lname}`,
                email,
                password,
                image,
            },
        });

        return NextResponse.json(user, { status: 200 });
    } catch (error) {
        console.error('Error creating user:', error);
        return NextResponse.json({ error: 'User creation failed' }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}