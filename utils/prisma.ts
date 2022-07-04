import { createRequire } from "https://deno.land/std@0.146.0/node/module.ts";

const require = createRequire(import.meta.url);
const { PrismaClient } = require("../prisma/deno/edge");
export const prisma = new PrismaClient();
