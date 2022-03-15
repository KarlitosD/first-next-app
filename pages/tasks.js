import { useEffect, useState } from 'react';
import Head from 'next/head';
import { Container, Grid } from '@nextui-org/react';
import { getSession, useSession } from "next-auth/react"
import useTasks from "/hooks/useTasks";
import Navbar from "/components/Navbar";
import TaskList from "/components/TaskList";
import AddTaskForm from "/components/AddTaskForm";
import { useRouter } from 'next/router';

export default function Tasks({ tasks: initialTasks, user }) {
	// export default function Tasks() {
	const {
		tasks,
		addTask,
		deleteTask,
		toggleCompleted,
		setTasks
	} = useTasks(initialTasks)
	// } = useTasks([])

	// const router = useRouter()
	// const [user, setUser] = useState({})
	// const { data: session, status } = useSession()

	// const getTasks = async () => {
	// 	const tasks = await await fetch("/api/tasks").then(res => res.json())
	// 	setTasks(tasks)
	// }

	// useEffect(() => {
	// 	if (!session) return router.push("/login")
	// 	getTasks()
	// }, [])
	return (
		<>
			<Head>
				<title>{user?.name} tasks</title>
			</Head>

			<Navbar />

			<Container display="flex" justify="center" alignItems="center" css={{ minHeight: "calc(100vh - 60px)" }}>
				{tasks.length === 0
					? <div>Loading</div>
					:
					<>
						<Grid.Container gap={4}>
							<AddTaskForm addTask={addTask} user={user} />
							{/* <AddTaskForm addTask={addTask} user={session.user} /> */}
							<TaskList tasks={tasks} deleteTask={deleteTask} toggleCompleted={toggleCompleted} />
						</Grid.Container>
					</>
				}
			</Container>

		</>
	)
}


export async function getServerSideProps(context) {
	const session = await getSession(context)
	// console.log(process.env.BASE_URL)
	if (!session) {
		return {
			redirect: {
				destination: "/login"
			}
		}
	}
	const tasks = await fetch(process.env.BASE_URL + "/api/tasks", {
		headers: {
			cookie: context.req.headers.cookie,
		}
	}).then(res => res.json())


	return {
		props: {
			user: session.user,
			tasks
		}
	}
}