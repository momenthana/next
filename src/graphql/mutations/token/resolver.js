import Hana from "hana.js"
import { env } from "process"

export const token = async (_, args) => {
  try {
    Hana.init({
      clientId: env.CLIENT_ID,
    })

    const token = await Hana.Auth.token({
      grantType: "authorization_code",
      code: args.input.code,
      redirectUri: env.REDIRECT_URI,
      clientSecret: env.CLIENT_SECRET ? env.CLIENT_SECRET : undefined,
    })

    return {
      accessToken: token.access_token,
      expiresIn: token.expires_in,
      idToken: token.id_token,
      scope: token.scope,
      tokenType: token.token_type,
    }
  } catch (err) {
    console.error(err)
  }
}
