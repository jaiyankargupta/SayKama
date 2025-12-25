import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../../../lib/mongodb";
import Order from "../../../../models/Order";
import Payment from "../../../../models/Payment";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "fallback-secret-key";

/**
 * GET /api/user/stats
 * Get user dashboard statistics
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

    // Get order statistics
    const [
      totalOrders,
      pendingOrders,
      processingOrders,
      shippedOrders,
      deliveredOrders,
      cancelledOrders,
      recentOrders,
      orderStatusBreakdown,
      monthlyOrderStats,
    ] = await Promise.all([
      // Total orders
      Order.countDocuments({ userId: decoded.userId }),

      // Orders by status
      Order.countDocuments({ userId: decoded.userId, status: "pending" }),
      Order.countDocuments({ userId: decoded.userId, status: "processing" }),
      Order.countDocuments({ userId: decoded.userId, status: "shipped" }),
      Order.countDocuments({ userId: decoded.userId, status: "delivered" }),
      Order.countDocuments({ userId: decoded.userId, status: "cancelled" }),

      // Recent orders (last 5)
      Order.find({ userId: decoded.userId })
        .sort({ createdAt: -1 })
        .limit(5)
        .select("orderNumber total status createdAt items")
        .lean(),

      // Order status breakdown with amounts
      Order.aggregate([
        { $match: { userId: decoded.userId } },
        {
          $group: {
            _id: "$status",
            count: { $sum: 1 },
            totalAmount: { $sum: "$total" },
          },
        },
      ]),

      // Monthly order statistics (last 6 months)
      Order.aggregate([
        {
          $match: {
            userId: decoded.userId,
            createdAt: {
              $gte: new Date(
                new Date().setMonth(new Date().getMonth() - 6)
              ),
            },
          },
        },
        {
          $group: {
            _id: {
              year: { $year: "$createdAt" },
              month: { $month: "$createdAt" },
            },
            count: { $sum: 1 },
            totalAmount: { $sum: "$total" },
          },
        },
        {
          $sort: { "_id.year": -1, "_id.month": -1 },
        },
      ]),
    ]);

    // Get payment statistics
    const [totalSpent, paymentStats, recentPayments] = await Promise.all([
      // Total amount spent (completed payments only)
      Payment.aggregate([
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
      ]),

      // Payment status breakdown
      Payment.aggregate([
        { $match: { userId: decoded.userId } },
        {
          $group: {
            _id: "$status",
            count: { $sum: 1 },
            totalAmount: { $sum: "$amount" },
          },
        },
      ]),

      // Recent payments (last 5)
      Payment.find({ userId: decoded.userId })
        .sort({ createdAt: -1 })
        .limit(5)
        .select("orderNumber amount status paymentMethod createdAt")
        .lean(),
    ]);

    const totalAmountSpent = totalSpent.length > 0 ? totalSpent[0].total : 0;

    // Calculate average order value
    const averageOrderValue =
      totalOrders > 0 ? totalAmountSpent / totalOrders : 0;

    return NextResponse.json(
      {
        orders: {
          total: totalOrders,
          pending: pendingOrders,
          processing: processingOrders,
          shipped: shippedOrders,
          delivered: deliveredOrders,
          cancelled: cancelledOrders,
          recent: recentOrders,
          statusBreakdown: orderStatusBreakdown,
          monthlyStats: monthlyOrderStats,
        },
        payments: {
          totalSpent: totalAmountSpent,
          averageOrderValue: Math.round(averageOrderValue * 100) / 100,
          statusBreakdown: paymentStats,
          recent: recentPayments,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("GET /api/user/stats error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
