import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../../../lib/mongodb";
import Product from "../../../../models/Product";

/**
 * GET /api/products/[slug]
 * Get single product by slug with aggressive caching
 * This endpoint is heavily cached as product details are frequently accessed
 */
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    await dbConnect();

    const { slug } = await params;

    // Find product by slug
    const product = await Product.findOne({
      slug,
      isActive: true,
    })
      .select("-__v -createdBy -updatedBy -costPrice")
      .populate("relatedProducts", "name slug price comparePrice images rating")
      .lean();

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Increment view count (optional - don't await to not slow down response)
    Product.findByIdAndUpdate(product._id, {
      $inc: { viewCount: 1 },
    }).catch(() => {});

    return NextResponse.json(
      { product },
      {
        status: 200,
        headers: {
          // Aggressive caching for product details
          // Cache for 10 minutes, serve stale for 1 hour while revalidating
          "Cache-Control": "public, s-maxage=600, stale-while-revalidate=3600",
          // Add ETag for conditional requests
          ETag: `"${product._id}-${product.updatedAt}"`,
        },
      },
    );
  } catch (error) {
    console.error("GET /api/products/[slug] error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
