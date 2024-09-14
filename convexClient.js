import { ConvexClient } from "convex/browser";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });
const client = new ConvexClient(process.env.CONVEX_URL);

export default client;
