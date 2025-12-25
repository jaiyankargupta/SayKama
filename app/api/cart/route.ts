import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../../lib/mongodb";
import Cart from "../../../models/Cart";
import Product from "../../../models/Product";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const JWT_SECRET = process.env.JWT_SECRET || "fallback-secret-key";

interface JWTPayload {
  userId: string;
}

interface CartItem {
  productId: mongoose.Types.ObjectId;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  slug?: string;
  comparePrice?: number;
}

interface AddToCartBody {
  productId: string;
  quantity?: number;
}

interface UpdateCartBody {
  productId: string;
  quantity: number;
}

/**
 * Get user ID from token or use session ID
 */
function getUserIdentifier(req: NextRequest): {
  userId?: string;
  sessionId?: string;
} {
  const token = req.cookies.get("token")?.value;

  if (token) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
      return { userId: decoded.userId };
    } catch {
      // Token invalid, use session ID
    }
  }

  // Use session ID from cookie or create new one
  let sessionId = req.cookies.get("cartSessionId")?.value;
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substring(2)}`;
  }

  return { sessionId };
}

/**
 * GET /api/cart
 * Get user's cart
 */
export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    const { userId, sessionId } = getUserIdentifier(req);

    // Find cart
    const query = userId ? { userId } : { sessionId };
    const cart = await Cart.findOne(query).lean();

    if (!cart) {
      // Return empty cart structure
      const response = NextResponse.json(
        {
          cart: {
            items: [],
            subtotal: 0,
            tax: 0,
            shippingCost: 0,
            discount: 0,
            total: 0,
          },
        },
        { status: 200 },
      );

      // Set session ID cookie if using session
      if (sessionId && !userId) {
        response.cookies.set("cartSessionId", sessionId, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          maxAge: 30 * 24 * 60 * 60, // 30 days
        });
      }

      return response;
    }

    const response = NextResponse.json({ cart }, { status: 200 });

    // Set session ID cookie if using session
    if (sessionId && !userId) {
      response.cookies.set("cartSessionId", sessionId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 30 * 24 * 60 * 60, // 30 days
      });
    }

    return response;
  } catch (error) {
    console.error("GET /api/cart error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

/**
 * POST /api/cart
 * Add item to cart
 */
export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const { userId, sessionId } = getUserIdentifier(req);
    const body = (await req.json()) as AddToCartBody;
    const { productId, quantity = 1 } = body;

    // Validate input
    if (!productId) {
      return NextResponse.json(
        { error: "Product ID is required" },
        { status: 400 },
      );
    }

    if (quantity < 1) {
      return NextResponse.json(
        { error: "Quantity must be at least 1" },
        { status: 400 },
      );
    }

    // Check if product exists and is active
    const product = await Product.findById(productId);

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    if (!product.isActive) {
      return NextResponse.json(
        { error: "Product is not available" },
        { status: 400 },
      );
    }

    if (product.quantity < quantity) {
      return NextResponse.json(
        { error: "Insufficient stock" },
        { status: 400 },
      );
    }

    // Find or create cart
    const query = userId ? { userId } : { sessionId };
    let cart = await Cart.findOne(query);

    if (!cart) {
      cart = new Cart(query);
    }

    // Add item to cart
    await cart.addItem(
      product._id,
      product.name,
      product.price,
      quantity,
      product.images[0],
      product.slug,
      product.comparePrice,
    );

    const response = NextResponse.json(
      {
        message: "Item added to cart",
        cart,
      },
      { status: 200 },
    );

    // Set session ID cookie if using session
    if (sessionId && !userId) {
      response.cookies.set("cartSessionId", sessionId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 30 * 24 * 60 * 60,
      });
    }

    return response;
  } catch (error) {
    console.error("POST /api/cart error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

/**
 * PUT /api/cart
 * Update item quantity in cart
 */
export async function PUT(req: NextRequest) {
  try {
    await dbConnect();

    const { userId, sessionId } = getUserIdentifier(req);
    const body = (await req.json()) as UpdateCartBody;
    const { productId, quantity } = body;

    // Validate input
    if (!productId) {
      return NextResponse.json(
        { error: "Product ID is required" },
        { status: 400 },
      );
    }

    if (quantity < 0) {
      return NextResponse.json(
        { error: "Quantity cannot be negative" },
        { status: 400 },
      );
    }

    // Find cart
    const query = userId ? { userId } : { sessionId };
    const cart = await Cart.findOne(query);

    if (!cart) {
      return NextResponse.json({ error: "Cart not found" }, { status: 404 });
    }

    // Check stock if increasing quantity
    if (quantity > 0) {
      const product = await Product.findById(productId);
      if (product && product.quantity < quantity) {
        return NextResponse.json(
          { error: "Insufficient stock" },
          { status: 400 },
        );
      }
    }

    // Update item quantity
    await cart.updateItemQuantity(
      new mongoose.Types.ObjectId(productId),
      quantity,
    );

    return NextResponse.json(
      {
        message: "Cart updated",
        cart,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("PUT /api/cart error:", error);

    if (error instanceof Error && error.message === "Item not found in cart") {
      return NextResponse.json({ error: error.message }, { status: 404 });
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

/**
 * DELETE /api/cart
 * Remove item from cart or clear cart
 */
export async function DELETE(req: NextRequest) {
  try {
    await dbConnect();

    const { userId, sessionId } = getUserIdentifier(req);
    const { searchParams } = new URL(req.url);
    const productId = searchParams.get("productId");
    const clearCart = searchParams.get("clear") === "true";

    // Find cart
    const query = userId ? { userId } : { sessionId };
    const cart = await Cart.findOne(query);

    if (!cart) {
      return NextResponse.json({ error: "Cart not found" }, { status: 404 });
    }

    if (clearCart) {
      // Clear entire cart
      await cart.clearCart();
      return NextResponse.json(
        {
          message: "Cart cleared",
          cart,
        },
        { status: 200 },
      );
    }

    if (!productId) {
      return NextResponse.json(
        { error: "Product ID is required" },
        { status: 400 },
      );
    }

    // Remove specific item
    await cart.removeItem(new mongoose.Types.ObjectId(productId));

    return NextResponse.json(
      {
        message: "Item removed from cart",
        cart,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("DELETE /api/cart error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
