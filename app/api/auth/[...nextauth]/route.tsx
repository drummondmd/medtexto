import NextAuth, { type DefaultSession } from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";

import { getUser } from "@/lib/databases/handler-pgdb";
import { checkPassword } from "@/lib/hash/hash";

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & {
      username?: string;
    };
  }
  interface JWT {
    username?: string;
  }
  interface User {
    username?: string;
  }
}

const handler = NextAuth({
  providers: [
    CredentialProvider({
      //secret: process.env.AUTH_SECRET,
      name: "Username",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "usuario" },
        password: { label: "Senha", type: "password" },
      },
      async authorize(credentials) {
        try {
          const user = await getUser(credentials.username, null);

          const isMatchedPassword = await checkPassword(credentials.password, user.senha_hash);
          if (!user || !isMatchedPassword) {
            return null;
          } else {
            return { id: user.id, name: user.nome, username: user.username, email: user.email };
          }
        } catch (error) {
          console.error(error, "erro no handler do CredentialOption");
          return null; // Importante adicionar um retorno explícito aqui
        }
      },
    }),
  ],
  cookies: {
    sessionToken: {
      name: "next-auth.session-token",
      options: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        // Remove a expiração para fazer a sessão durar enquanto o navegador estiver aberto
      },
    },
  },
  callbacks: {
    async session({ session, token }) {
      // Adiciona o username na sessão
      session.user.username = token.username as unknown as string;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.username = user.username as unknown as string;
      }
      return token;
    },
  },
});

export { handler as GET, handler as POST };
