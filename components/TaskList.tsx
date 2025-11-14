import React from 'react';
import { Task } from '../types';
import TaskItem from './TaskItem';
import { EmptyStateIcon } from './Icons';

interface TaskListProps {
    tasks: Task[];
    onToggleTask: (id: string) => void;
    onDeleteTask: (id: string) => void;
    onEditTask: (task: Task) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onToggleTask, onDeleteTask, onEditTask }) => {
    if (tasks.length === 0) {
        return (
            <div className="text-center py-10 px-4 border-2 border-dashed border-accent rounded-lg">
                <EmptyStateIcon />
                <h3 className="mt-4 text-lg font-medium text-text-main">No tasks yet</h3>
                <p className="mt-1 text-sm text-text-secondary">Get started by adding a new task above.</p>
            </div>
        );
    }
    
    return (
        <div className="space-y-4">
            {tasks.map(task => (
                <TaskItem
                    key={task.id}
                    task={task}
                    onToggleTask={onToggleTask}
                    onDeleteTask={onDeleteTask}
                    onEditTask={onEditTask}
                />
            ))}
        </div>
    );
};

export default TaskList;
