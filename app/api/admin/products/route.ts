import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../../../lib/mongodb";
import Product from "../../../../models/Product";
import User from "../../../../models/User";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "fallback-secret-key";

interface JWTPayload {
  userId: string;
}

interface AdminAuthResult {
  error?: string;
  status?: number;
  user?: typeof User.prototype;
  userId?: string;
}

interface ProductQuery {
  $or?: Array<{
    name?: { $regex: string; $options: string };
    description?: { $regex: string; $options: string };
    sku?: { $regex: string; $options: string };
  }>;
  category?: string;
  isActive?: boolean;
  isFeatured?: boolean;
}

interface ProductSort {
  [key: string]: 1 | -1;
}

interface CreateProductBody {
  [key: string]: any;
  name: string;
  description: string;
  price: number;
  comparePrice?: number;
  quantity: number;
  sku?: string;
  images: string[];
  category: string;
  tags?: string[];
  attributes?: Array<{
    name: string;
    value: string;
  }>;
  isActive?: boolean;
  isFeatured?: boolean;
  lowStockThreshold?: number;
  weight?: number;
  dimensions?: {
    length: number;
    width: number;
    height: number;
  };
  slug?: string;
}

/**
 * Verify admin authentication
 */
async function verifyAdmin(req: NextRequest): Promise<AdminAuthResult> {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return { error: "Not authenticated", status: 401 };
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
    const user = await User.findById(decoded.userId);

    if (!user) {
      return { error: "User not found", status: 404 };
    }

    if (user.role !== "admin") {
      return { error: "Access denied. Admin only.", status: 403 };
    }

    return { user, userId: decoded.userId };
  } catch {
    return { error: "Invalid or expired token", status: 401 };
  }
}

/**
 * GET /api/admin/products
 * Get all products with pagination, filtering, and search
 */
export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    // Verify admin
    const auth = await verifyAdmin(req);
    if (auth.error) {
      return NextResponse.json({ error: auth.error }, { status: auth.status });
    }

    // Get query params
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const search = searchParams.get("search") || "";
    const category = searchParams.get("category");
    const isActive = searchParams.get("isActive");
    const isFeatured = searchParams.get("isFeatured");
    const sortBy = searchParams.get("sortBy") || "createdAt";
    const sortOrder = searchParams.get("sortOrder") || "desc";

    // Build query
    const query: ProductQuery = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { sku: { $regex: search, $options: "i" } },
      ];
    }

    if (category) {
      query.category = category;
    }

    if (isActive !== null && isActive !== undefined) {
      query.isActive = isActive === "true";
    }

    if (isFeatured !== null && isFeatured !== undefined) {
      query.isFeatured = isFeatured === "true";
    }

    // Calculate skip
    const skip = (page - 1) * limit;

    // Build sort
    const sort: ProductSort = {};
    sort[sortBy] = sortOrder === "asc" ? 1 : -1;

    // Get products with pagination
    const [products, total] = await Promise.all([
      Product.find(query)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .select("-__v")
        .lean(),
      Product.countDocuments(query),
    ]);

    // Calculate pagination info
    const totalPages = Math.ceil(total / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    // Get statistics
    const stats = await Product.aggregate([
      {
        $group: {
          _id: null,
          totalProducts: { $sum: 1 },
          activeProducts: {
            $sum: { $cond: [{ $eq: ["$isActive", true] }, 1, 0] },
          },
          featuredProducts: {
            $sum: { $cond: [{ $eq: ["$isFeatured", true] }, 1, 0] },
          },
          totalValue: { $sum: { $multiply: ["$price", "$quantity"] } },
          lowStockProducts: {
            $sum: {
              $cond: [
                {
                  $and: [
                    { $gt: ["$quantity", 0] },
                    { $lte: ["$quantity", "$lowStockThreshold"] },
                  ],
                },
                1,
                0,
              ],
            },
          },
          outOfStockProducts: {
            $sum: { $cond: [{ $eq: ["$quantity", 0] }, 1, 0] },
          },
        },
      },
    ]);

    return NextResponse.json(
      {
        products,
        pagination: {
          total,
          page,
          limit,
          totalPages,
          hasNextPage,
          hasPrevPage,
        },
        stats: stats.length > 0 ? stats[0] : {},
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("GET /api/admin/products error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

/**
 * POST /api/admin/products
 * Create a new product
 */
export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    // Verify admin
    const auth = await verifyAdmin(req);
    if (auth.error) {
      return NextResponse.json({ error: auth.error }, { status: auth.status });
    }

    // Parse request body
    const body = (await req.json()) as CreateProductBody;

    // Validate required fields
    const requiredFields = [
      "name",
      "description",
      "price",
      "quantity",
      "images",
      "category",
    ];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `${field} is required` },
          { status: 400 },
        );
      }
    }

    // Validate images array
    if (!Array.isArray(body.images) || body.images.length === 0) {
      return NextResponse.json(
        { error: "At least one product image is required" },
        { status: 400 },
      );
    }

    // Generate slug if not provided
    let slug = body.slug;
    if (!slug) {
      slug = body.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
    }

    // Check if slug already exists
    const existingProduct = await Product.findOne({ slug });
    if (existingProduct) {
      // Add random suffix to slug
      slug = `${slug}-${Math.random().toString(36).substring(2, 8)}`;
    }

    // Create product
    const product = await Product.create({
      ...body,
      slug,
      createdBy: auth.userId,
      updatedBy: auth.userId,
    });

    return NextResponse.json(
      {
        message: "Product created successfully",
        product,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("POST /api/admin/products error:", error);

    // Handle validation errors
    if (error instanceof Error && error.name === "ValidationError") {
      interface ValidationError extends Error {
        errors: Record<string, { message: string }>;
      }
      const validationError = error as ValidationError;
      const messages = Object.values(validationError.errors).map(
        (e) => e.message,
      );
      return NextResponse.json({ error: messages.join(", ") }, { status: 400 });
    }

    // Handle duplicate key errors
    if (
      error &&
      typeof error === "object" &&
      "code" in error &&
      error.code === 11000
    ) {
      interface DuplicateKeyError {
        code: number;
        keyPattern: Record<string, number>;
      }
      const duplicateError = error as DuplicateKeyError;
      const field = Object.keys(duplicateError.keyPattern)[0];
      return NextResponse.json(
        { error: `${field} already exists` },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
