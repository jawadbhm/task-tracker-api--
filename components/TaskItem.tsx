import React from 'react';
import { Task } from '../types';
import { EditIcon, TrashIcon } from './Icons';

interface TaskItemProps {
    task: Task;
    onToggleTask: (id: string) => void;
    onDeleteTask: (id: string) => void;
    onEditTask: (task: Task) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggleTask, onDeleteTask, onEditTask }) => {
    return (
        <div className={`
            flex items-start gap-4 p-4 rounded-lg bg-accent 
            transition-all duration-300 ease-in-out
            ${task.completed ? 'opacity-60' : 'hover:bg-gray-700'}
        `}>
            <input
                type="checkbox"
                checked={task.completed}
                onChange={() => onToggleTask(task.id)}
                className="mt-1.5 h-5 w-5 rounded border-gray-500 text-highlight bg-secondary focus:ring-highlight focus:ring-offset-secondary"
            />
            <div className="flex-1">
                <p className={`font-semibold ${task.completed ? 'line-through text-text-secondary' : 'text-text-main'}`}>
                    {task.title}
                </p>
                <p className={`text-sm ${task.completed ? 'line-through text-gray-500' : 'text-text-secondary'}`}>
                    {task.description}
                </p>
            </div>
            <div className="flex items-center gap-2">
                <button
                    onClick={() => onEditTask(task)}
                    className="p-2 text-text-secondary hover:text-highlight transition-colors duration-200"
                    aria-label="Edit task"
                >
                    <EditIcon />
                </button>
                <button
                    onClick={() => onDeleteTask(task.id)}
                    className="p-2 text-text-secondary hover:text-red-500 transition-colors duration-200"
                    aria-label="Delete task"
                >
                    <TrashIcon />
                </button>
            </div>
        </div>
    );
};

export default TaskItem;
