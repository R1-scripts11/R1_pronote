// Importation de la bibliothèque NextAuth.js
import NextAuth from "next-auth"
import { options } from "./options"


// Initialisation de NextAuth avec sa configuration par défaut
// NextAuth est une bibliothèque qui gère l'authentification dans les applications Next.js
const handler = NextAuth(options)

// Exportation des handlers pour les requêtes GET et POST
// Dans le contexte des Route Handlers de Next.js, il est nécessaire d'exporter
// les handlers pour les types de requêtes HTTP que vous souhaitez gérer
// NextAuth.js attend ces deux handlers pour fonctionner correctement :
// - GET : Utilisé pour récupérer des informations d'authentification, comme la session actuelle
// - POST : Utilisé pour gérer des actions d'authentification, comme la connexion ou la déconnexion
export { handler as GET, handler as POST }