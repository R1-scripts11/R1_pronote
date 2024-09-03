import type { NextAuthOptions } from "next-auth";

//PROVIDERS (MOYEN de connexion)
import GitHubProvider from 'next-auth/providers/github' //GITHUB
import GoogleProvider from 'next-auth/providers/google' //GOOGLE
import CredentialsProvider from 'next-auth/providers/credentials' //REEL COMPTE 

import { PrismaAdapter } from "@next-auth/prisma-adapter" //Adapter prisma pour next-auth
import { PrismaClient } from "@prisma/client"            //Prisma

import { getUserByEmail } from "@/src/data/users";
import { error } from "console";

const prisma = new PrismaClient() //Instance de prisma
export const options: NextAuthOptions = {
    session: {
        strategy: 'jwt'
    },
    providers: [
        CredentialsProvider({
            credentials: {
                email: { label: "Email", type: "text", placeholder: "email@example.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {

                if (!credentials?.email || !credentials?.password) {
                    return null;  // Dans le cas ou les credentials sont mauvais
                }
                console.log(credentials.email)
                const user = await getUserByEmail(credentials?.email);
                console.log('user', user)
                if(user){
                    
                    const isMatch = user?.password === credentials?.password;
                    if (isMatch){
                        return user;
                    }else{
                        throw new Error('Mdp incorrect')
                    }
                }else{
                    throw new Error('Utilisateur introuvable')
                }
            },
        }),
        GitHubProvider({ 
            clientId: process.env.GITHUB_ID as string,  //ID du client à changer si le domaine change
            clientSecret: process.env.GITHUB_SECRET as string //Clé secrète 
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID as string,
            clientSecret: process.env.GOOGLE_SECRET as string
        }),
    ],
    
    callbacks: {},  
    adapter: PrismaAdapter(prisma)
}