import React from 'react'
import { Card, Checkbox, Button } from '@nextui-org/react';


function TaskItem({ task, deleteTask, toggleCompleted }) {
	return (
		<Card animated>
			<Card.Body css={{ flexDirection: "row", justifyContent: "space-between" }}>
				<Checkbox checked={task.completed} line color="error" onChange={() => toggleCompleted(task.id)}>
					{task.title}
				</Checkbox>
				<Button color="error" flat auto onClick={() => deleteTask(task.id)}>Eliminar</Button>
			</Card.Body>
		</Card>
	)
}

export default TaskItem