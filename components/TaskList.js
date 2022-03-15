import React from 'react'
import { Card, Grid } from '@nextui-org/react';
import TaskItem from './TaskItem';

function TaskList({ tasks, deleteTask, toggleCompleted }) {
	return (
		<Grid xs={12} md={8}>
			<Card>
				<Card.Body>
					{tasks.map(task => (
						<TaskItem key={task.id} task={task} deleteTask={deleteTask} toggleCompleted={toggleCompleted} />
					))}
				</Card.Body>
			</Card>
		</Grid>
	)
}

export default TaskList