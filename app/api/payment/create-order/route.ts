import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../../../lib/mongodb";
import Cart from "../../../../models/Cart";
import jwt from "jsonwebtoken";
import Razorpay from "razorpay";

const JWT_SECRET = process.env.JWT_SECRET || "fallback-secret-key";
const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID || "";
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET || "";

interface JWTPayload {
  userId: string;
}

interface RazorpayOrderResponse {
  id: string;
  amount: number;
  currency: string;
}

/**
 * POST /api/payment/create-order
 * Create a Razorpay order for payment
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
    } catch (err) {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 401 },
      );
    }

    // Get cart
    const cart = await Cart.findOne({ userId: decoded.userId });

    if (!cart || cart.items.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    // Calculate amount in paise (Razorpay accepts amount in smallest currency unit)
    const amount = Math.round(cart.total * 100);

    // Initialize Razorpay
    const razorpay = new Razorpay({
      key_id: RAZORPAY_KEY_ID,
      key_secret: RAZORPAY_KEY_SECRET,
    });

    // Create Razorpay order
    const razorpayOrder = await razorpay.orders.create({
      amount,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      notes: {
        userId: decoded.userId,
        cartId: cart._id.toString(),
      },
    });

    return NextResponse.json(
      {
        orderId: razorpayOrder.id,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        keyId: RAZORPAY_KEY_ID,
        cart: {
          items: cart.items,
          subtotal: cart.subtotal,
          tax: cart.tax,
          shippingCost: cart.shippingCost,
          discount: cart.discount,
          total: cart.total,
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("POST /api/payment/create-order error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Failed to create payment order";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
