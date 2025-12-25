import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../../../../lib/mongodb";
import Order from "../../../../../models/Order";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "fallback-secret-key";

/**
 * GET /api/user/orders/[id]
 * Get a specific order by ID
 */
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await dbConnect();

    // Get token from cookie
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // Verify token
    let decoded: any;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 401 },
      );
    }

    const { id } = await params;

    // Get order
    const order = await Order.findOne({
      _id: id,
      userId: decoded.userId,
    }).lean();

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    return NextResponse.json({ order }, { status: 200 });
  } catch (error) {
    console.error("GET /api/user/orders/[id] error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

/**
 * PATCH /api/user/orders/[id]
 * Cancel an order (only if status is pending or processing)
 */
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await dbConnect();

    // Get token from cookie
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // Verify token
    let decoded: any;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 401 },
      );
    }

    const { id } = await params;
    const body = await req.json();
    const { action, cancellationReason } = body;

    // Get order
    const order = await Order.findOne({
      _id: id,
      userId: decoded.userId,
    });

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    // Handle cancel action
    if (action === "cancel") {
      // Check if order can be cancelled
      if (order.status === "delivered" || order.status === "cancelled") {
        return NextResponse.json(
          {
            error: `Cannot cancel order with status: ${order.status}`,
          },
          { status: 400 },
        );
      }

      if (order.status === "shipped") {
        return NextResponse.json(
          {
            error:
              "Order has already been shipped. Please contact support for return/refund.",
          },
          { status: 400 },
        );
      }

      // Cancel the order
      order.status = "cancelled";
      order.cancelledAt = new Date();
      order.cancellationReason = cancellationReason || "Cancelled by customer";
      await order.save();

      return NextResponse.json(
        {
          message: "Order cancelled successfully",
          order,
        },
        { status: 200 },
      );
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    console.error("PATCH /api/user/orders/[id] error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
