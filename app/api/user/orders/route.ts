import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../../../lib/mongodb";
import Order from "../../../../models/Order";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "fallback-secret-key";

interface JWTPayload {
  userId: string;
}

interface OrderQuery {
  userId: string;
  status?: string;
}

interface CreateOrderBody {
  items: Array<{
    productId: string;
    name: string;
    price: number;
    quantity: number;
    image?: string;
    slug?: string;
  }>;
  subtotal: number;
  tax: number;
  shippingCost: number;
  discount: number;
  total: number;
  paymentMethod: string;
  shippingAddress: {
    fullName: string;
    phone: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  billingAddress?: {
    fullName: string;
    phone: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  notes?: string;
}

/**
 * GET /api/user/orders
 * Get current user's orders with pagination and filtering
 * Query params: page, limit, status
 */
export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    // Get token from cookie
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // Verify token
    let decoded: JWTPayload;
    try {
      decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
    } catch {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 401 },
      );
    }

    // Get query params
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const status = searchParams.get("status");

    // Build query
    const query: OrderQuery = { userId: decoded.userId };
    if (status && status !== "all") {
      query.status = status;
    }

    // Calculate skip
    const skip = (page - 1) * limit;

    // Get orders with pagination
    const [orders, total] = await Promise.all([
      Order.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      Order.countDocuments(query),
    ]);

    // Calculate pagination info
    const totalPages = Math.ceil(total / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    return NextResponse.json(
      {
        orders,
        pagination: {
          total,
          page,
          limit,
          totalPages,
          hasNextPage,
          hasPrevPage,
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("GET /api/user/orders error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

/**
 * POST /api/user/orders
 * Create a new order
 */
export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    // Get token from cookie
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // Verify token
    let decoded: JWTPayload;
    try {
      decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
    } catch {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 401 },
      );
    }

    // Parse request body
    const body = (await req.json()) as CreateOrderBody;
    const {
      items,
      subtotal,
      tax,
      shippingCost,
      discount,
      total,
      paymentMethod,
      shippingAddress,
      billingAddress,
      notes,
    } = body;

    // Validate required fields
    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: "Order must contain at least one item" },
        { status: 400 },
      );
    }

    if (!shippingAddress) {
      return NextResponse.json(
        { error: "Shipping address is required" },
        { status: 400 },
      );
    }

    if (!paymentMethod) {
      return NextResponse.json(
        { error: "Payment method is required" },
        { status: 400 },
      );
    }

    // Create order
    const order = await Order.create({
      userId: decoded.userId,
      items,
      subtotal: subtotal || 0,
      tax: tax || 0,
      shippingCost: shippingCost || 0,
      discount: discount || 0,
      total: total || 0,
      paymentMethod,
      shippingAddress,
      billingAddress: billingAddress || shippingAddress,
      notes: notes || "",
      status: "pending",
      paymentStatus: paymentMethod === "cod" ? "pending" : "pending",
    });

    return NextResponse.json(
      {
        message: "Order created successfully",
        order,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("POST /api/user/orders error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
