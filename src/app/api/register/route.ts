import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { name, email, password, phone } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Check if user exists in database
    try {
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        return NextResponse.json({ error: "Email is already registered" }, { status: 400 });
      }
    } catch (e) {
      // If DB is offline, check fallback JSON store
      const { readJsonStore } = await import('@/lib/jsonStore');
      const users = readJsonStore<any>('users.json');
      if (users.some((u: any) => u.email?.toLowerCase() === email.toLowerCase())) {
        return NextResponse.json({ error: "Email is already registered" }, { status: 400 });
      }
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    let userId = `usr_${Date.now()}`;

    // Create user in database
    try {
      const user = await prisma.user.create({
        data: {
          name,
          email,
          phone: phone || null,
          password: hashedPassword,
          role: "USER", // Default role
        },
      });
      userId = user.id;
    } catch (dbErr) {
      console.warn("Prisma error during user registration, falling back to local JSON store:", dbErr);
    }

    // Keep fallback store synchronized for instant admin visibility
    try {
      const { readJsonStore, writeJsonStore } = await import('@/lib/jsonStore');
      let users = readJsonStore<any>('users.json');
      if (!users || users.length === 0) {
        const { getAllUsersWithDetails } = await import('@/lib/userStore');
        users = await getAllUsersWithDetails();
      }

      const existingIndex = users.findIndex((u: any) => u.email?.toLowerCase() === email.toLowerCase());
      if (existingIndex === -1) {
        users.unshift({
          id: userId,
          name,
          email,
          phone: phone || '',
          role: "USER",
          provider: "Credentials",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          addresses: [],
          orders: [],
          ordersCount: 0,
          totalSpent: 0
        });
        writeJsonStore('users.json', users);
      }
    } catch (syncErr) {
      console.error("Error syncing user to json store:", syncErr);
    }

    return NextResponse.json({ message: "User registered successfully", userId }, { status: 201 });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
