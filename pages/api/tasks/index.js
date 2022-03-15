import { getSession } from "next-auth/react"
import { prisma } from "/lib/prisma.js"

const handleGet = async ({ req }) => {
	// const session = getSession({ req })
	// console.log({ session })
	// const { user: { id: userId } } = session
	// const tasks = await prisma.task.findMany({ where: { userId: userId } })
	const tasks = await prisma.task.findMany()
	return { status: 200, response: tasks }
}

const handlePost = async ({ req }) => {
	// const session = await getSession({ req })
	// console.log({ session })
	const { body } = req
	const { user: { id: userId } } = session
	const task = await prisma.task.create({
		data: {
			...body,
			userId
		}
	})

	return { status: 200, response: task }
}

const handlers = {
	GET: handleGet,
	POST: handlePost
}

export default async function handler(req, res) {
	try {
		// if (!session) throw new Error("Forbidden")
		const { status, response } = await handlers[req.method]({ req, res })
		return res.status(status).send(response)
	} catch (error) {
		console.log(error.message)
		return res.status(500).send({
			error: true,
			message: error.message
		})
	}
} 