import React from 'react'
import { useState } from "react"
import { Card, Button, Grid, Input, Spacer, Text } from '@nextui-org/react';

function AddTaskForm({ addTask, user }) {
	const [taskTitle, setTaskTitle] = useState("")


	const handleSubmit = e => {
		e.preventDefault()
		if (!taskTitle.trim()) return
		addTask(taskTitle)
		setTaskTitle("")
	}

	return (
		<Grid xs={12} md={3}>
			<Card>
				<Card.Header>
					{/* <Text h3>{user.name}</Text> */}
				</Card.Header>

				<Card.Body as="form" css={{ display: "flex", flexDirection: "column", justifyContent: "center" }} onSubmit={handleSubmit}>
					<Input aria-label="Task title" placeholder="Task title" id="title" value={taskTitle} onChange={e => setTaskTitle(e.target.value)} required />
					<Spacer y={1} />
					<Button>Add task</Button>
				</Card.Body>
			</Card>
		</Grid>
	)
}

export default AddTaskForm