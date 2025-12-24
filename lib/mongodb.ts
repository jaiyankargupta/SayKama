import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "";

/**
 * Use a global variable to cache the connection across hot-reloads in development.
 * This prevents creating multiple connections during HMR.
 */
type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

declare global {
  // eslint-disable-next-line no-var
  var _mongooseCache: MongooseCache | undefined;
}

const cached: MongooseCache = global._mongooseCache ?? {
  conn: null,
  promise: null,
};

async function dbConnect(): Promise<typeof mongoose> {
  // Only throw error when actually trying to connect (runtime), not during build
  if (!MONGODB_URI) {
    throw new Error(
      "Please define the MONGODB_URI environment variable inside .env.local",
    );
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts: mongoose.ConnectOptions = {
      // Prevent mongoose from buffering model creation calls — keep minimal options,
      // you can add useNewUrlParser / useUnifiedTopology in older mongoose versions if needed.
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((m) => {
      return m;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
