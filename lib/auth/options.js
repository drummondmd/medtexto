import CredentialProvider from "next-auth/providers/credentials"
import { getUser } from "../databases/handler-pgdb"
import { checkPassword } from "../hash/hash"


async function handleSession({ session, token }) {
  // Adiciona o username na sessão
  session.user.username = token.username;
  return session;
}

async function handleJWT({ token, user }) {
  if (user) {
    token.username = user.username;
  }
  return token;
}

async function handleAuthorize(credentials, req) {
  try {
    const user = await getUser(credentials.username)
    const isMatchedPassword = await checkPassword(credentials.password, user.senha_hash);
    if (!user || !isMatchedPassword) {
      return null
    }
    else {
      return { name: user.nome, username: user.username, email: user.email }
    }

  } catch (error) {
    console.error(error, "erro no handler do CredentialOption")

  }
}

export const options = {
  providers: [CredentialProvider({
    secret: process.env.AUTH_SECRET,
    name: "Username",
    credentials: {
      username: { label: "Username", type: "text", placeholder: "usuario" },
      password: { label: "Senha", type: "password" }
    },
    authorize:handleAuthorize

  })],
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
    session: handleSession,
    jwt: handleJWT
  },


}
