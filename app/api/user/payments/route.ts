import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../../../lib/mongodb";
import Payment from "../../../../models/Payment";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "fallback-secret-key";

/**
 * GET /api/user/payments
 * Get current user's payment history with pagination
 * Query params: page, limit, status
 */
export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    // Get token from cookie
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }

    // Verify token
    let decoded: any;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 401 }
      );
    }

    // Get query params
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const status = searchParams.get("status");

    // Build query
    const query: any = { userId: decoded.userId };
    if (status && status !== "all") {
      query.status = status;
    }

    // Calculate skip
    const skip = (page - 1) * limit;

    // Get payments with pagination
    const [payments, total] = await Promise.all([
      Payment.find(query)
        .populate("orderId", "orderNumber items total")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Payment.countDocuments(query),
    ]);

    // Calculate pagination info
    const totalPages = Math.ceil(total / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    // Calculate total amount paid
    const totalAmountPaid = await Payment.aggregate([
      {
        $match: {
          userId: decoded.userId,
          status: "completed",
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$amount" },
        },
      },
    ]);

    const totalPaid =
      totalAmountPaid.length > 0 ? totalAmountPaid[0].total : 0;

    return NextResponse.json(
      {
        payments,
        pagination: {
          total,
          page,
          limit,
          totalPages,
          hasNextPage,
          hasPrevPage,
        },
        stats: {
          totalAmountPaid: totalPaid,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("GET /api/user/payments error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
