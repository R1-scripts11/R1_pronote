import { PrismaClient, User } from "@prisma/client"; // Import Prisma

const prisma = new PrismaClient(); // Instance de Prisma

export const getUserByEmail = async (email: string): Promise<User | null> => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                email: email,
            },
        });
        return user;
    } catch (error) {
        console.error("Error fetching user by email:", error);
        return null;
    } finally {
        await prisma.$disconnect(); // Assurez-vous de déconnecter Prisma pour éviter les connexions persistantes
    }
};
