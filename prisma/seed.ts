import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

async function main() {
    const luzi = await prisma.user.upsert({
        where: { email: "luzi@example.com" },
        update: {},
        create: {
            email: 'luzi@example.com',
            username: 'luzi',
            hash_password: '$2b$10$zrkv7rdbZvydkLza/ePQ5eZpDWVFN3j66X3VKCDSVyksp9H0vE5/e'
        }
    });

    console.log(luzi.id);
}