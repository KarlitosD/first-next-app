import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import DiscordProvider from "next-auth/providers/discord"
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";

import { PrismaAdapter } from "@next-auth/prisma-adapter"

import { prisma } from "/lib/prisma"

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"

export default NextAuth({
	adapter: PrismaAdapter(prisma),
	providers: [
		GithubProvider({
			clientId: process.env.GITHUB_ID,
			clientSecret: process.env.GITHUB_SECRET,
		}),
		DiscordProvider({
			clientId: process.env.DISCORD_CLIENT_ID,
			clientSecret: process.env.DISCORD_CLIENT_SECRET
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET
		}),
		FacebookProvider({
			clientId: process.env.FACEBOOK_CLIENT_ID,
			clientSecret: process.env.FACEBOOK_CLIENT_SECRET
		})
	],
	secret: process.env.NEXTAUTH_SECRET,
	callbacks: {
		async session({ session, user }) {
			session.user.id = user.id
			return session
		}
	}
})