import { PrismaClient } from "@prisma/client";

// TODO: is there a cooler way to do this?
export abstract class IDBConnection extends PrismaClient {}
