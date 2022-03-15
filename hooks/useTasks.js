// @ts-check
import { useState } from "react"
import cuid from "cuid"

export default function useTasks(initialTasks) {
	const [tasks, setTasks] = useState(initialTasks)

	const addTask = taskTitle => {
		const newTask = {
			id: cuid(),
			title: taskTitle,
			completed: false
		}

		setTasks(prevTasks => [...prevTasks, newTask])

		fetch("/api/tasks", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(newTask)
		})
	}

	const deleteTask = id => {
		setTasks(prevTasks => prevTasks.filter(task => !(task.id === id)))
		fetch("/api/tasks/" + id, { method: "DELETE" })
	}

	const toggleCompleted = id => {
		const task = tasks.find(task => task.id === id)
		task.completed = !task.completed
		setTasks([...tasks])
		fetch("/api/tasks/" + id, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(task)
		})
	}

	return {
		tasks,
		addTask,
		deleteTask,
		toggleCompleted,
		setTasks
	}
}