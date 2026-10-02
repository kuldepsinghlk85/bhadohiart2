"use server";

import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { createAdminToken, setAdminSessionCookie, clearAdminSessionCookie, AdminPayload } from "@/lib/adminAuth";
import { redirect } from "next/navigation";

export async function adminLoginAction(formData: FormData) {
  const email = String(formData.get("email") || "").trim().toLowerCase();
  const password = String(formData.get("password") || "").trim();
  const from = String(formData.get("from") || "").trim();

  if (!email || !password) {
    return { error: "Please enter both email and password." };
  }

  let adminData: AdminPayload | null = null;

  // 1. Emergency Fallback Accounts
  if (email === "admin@bhadohiartsweave.com" && password === "admin123") {
    adminData = {
      id: "admin-hardcoded",
      email: "admin@bhadohiartsweave.com",
      name: "Bhadohi Administrator",
      role: "ADMIN"
    };
  } else if (email === "superadmin@bhadohiartsweave.com" && password === "password123") {
    adminData = {
      id: "superadmin-hardcoded",
      email: "superadmin@bhadohiartsweave.com",
      name: "Super Administrator",
      role: "SUPERADMIN"
    };
  } else {
    // 2. Query Database for Administrator
    try {
      const user = await prisma.user.findUnique({
        where: { email }
      });

      if (!user || !user.password) {
        return { error: "Invalid email or password." };
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return { error: "Invalid email or password." };
      }

      const role = String(user.role).toUpperCase();
      if (role !== "ADMIN" && role !== "SUPERADMIN") {
        return { 
          error: "Access denied: This account does not have administrator privileges. Please login using the customer storefront login." 
        };
      }

      adminData = {
        id: user.id,
        email: user.email || email,
        name: user.name || "Administrator",
        role: role as "ADMIN" | "SUPERADMIN"
      };
    } catch (e: any) {
      console.error("Admin DB lookup error:", e);
      return { error: "Unable to connect to authentication server. Please try again." };
    }
  }

  if (!adminData) {
    return { error: "Invalid email or password." };
  }

  // 3. Issue Isolated Admin Session JWT
  try {
    const token = await createAdminToken(adminData);
    await setAdminSessionCookie(token);
  } catch (err: any) {
    console.error("Admin token creation error:", err);
    return { error: "Failed to establish admin session." };
  }

  // 4. Redirect to requested admin route or /admin
  const destination = (from && from.startsWith("/admin") && from !== "/admin/login") ? from : "/admin";
  redirect(destination);
}

export async function adminLogoutAction() {
  await clearAdminSessionCookie();
  redirect("/admin/login");
}
