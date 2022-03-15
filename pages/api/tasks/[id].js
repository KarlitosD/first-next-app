import { prisma } from "/lib/prisma.js"

const handlePatch = async (req, res) => {
	const { query, body } = req
	const task = await prisma.task.update({
		where: {
			id: query.id
		},
		data: body
	})
	return { status: 200, response: task }
}

const handleDelete = async (req, res) => {
	const { query } = req
	const task = await prisma.task.delete({
		where: {
			id: query.id
		},
	})
	return { status: 200, response: task }
}

const handlers = {
	PATCH: handlePatch,
	DELETE: handleDelete
}

export default async function handler(req, res) {
	try {
		if (!Object.keys(handlers).includes(req.method)) throw new Error("Method no valid")
		const { status, response } = await handlers[req.method](req, res)
		return res.status(status).send(response)
	} catch (error) {
		console.log(error.message)
		return res.status(500).send({
			error: true,
			message: error.message
		})
	}
} 