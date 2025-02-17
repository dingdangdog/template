import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { NuxtAuthHandler } from "#auth";
import { encryptBySHA256 } from "~/server/utils/common";
import prisma from "~/lib/prisma";

export default NuxtAuthHandler({
  // A secret string you define, to ensure correct encryption
  secret: useRuntimeConfig().authSecret,
  pages: {
    signIn: "/auth/login",
    error: "/auth/login",
    signOut: "/auth/login",
  },
  providers: [
    // @ts-ignore Use .default here for it to work during SSR.
    // GithubProvider.default({
    //   clientId: useRuntimeConfig().githubClientId,
    //   clientSecret: useRuntimeConfig().githubClientSecrets,
    // }),
    CredentialsProvider.default({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any) {
        // console.log(credentials);
        const username = credentials?.username;
        const password = credentials?.password;

        const entrypassword = encryptBySHA256(username || "", password || "");
        const user = await prisma.user.findUnique({
          where: {
            username,
            password: entrypassword,
          },
        });
        if (!user) {
          return null;
        }
        return {
          id: user.id,
          name: user.username,
          email: user.email,
          image: user.avatar,
        };
      },
    }),
  ],
  callbacks: {
    // jwt回调，用于处理 token 和用户信息
    async jwt(param) {
      if (param.account) {
        // console.log("jwtparam", param);
        if (param.account.provider == "github") {
        } else if (param.account.provider == "credentials") {
          param.token.id = String(param.user.id); // 将用户 ID 存储到 token 中
          param.token.name = String(param.user.name);
          param.token.picture = String(param.user.image);
          param.token.email = String(param.user.email);
          param.token.provider = "credentials";
        }
      }
      return param.token;
    },
    async redirect({ url, baseUrl }) {
      // 默认将用户重定向到有效的 URL
      return url.startsWith(baseUrl) ? url : baseUrl + url;
    },
  },
});
