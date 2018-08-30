import { MAIN_URL, TOKEN } from './config';

export const api = {
    async fetchTasks () {
        const response = await fetch(MAIN_URL, {
            method: 'GET',
            headers: {
                Authorization: TOKEN
            }
        });

        if (response.status !== 200) {
            throw new Error('Tasks were not loaded!');
        }

        const { data: tasks } = await response.json();

        return tasks;
    },
    async createTask (message) {
        const response = await fetch(MAIN_URL, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                Authorization: TOKEN
            },
            body: JSON.stringify({
                message,
            }),
        });

        if (response.status !== 200) {
            throw new Error('Create were not loaded.');
        }

        const { data: task } = await response.json();

        return task;
    },
    async updateTask (taskToUpdate) {
        const response = await fetch(MAIN_URL, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                Authorization: TOKEN
            },
            body: JSON.stringify([
                taskToUpdate],
            ),
        });

        if (response.status !== 200) {
            throw new Error('Task was not update');
        }

        const { data: task } = await response.json();

        return task[0];
    },
    async removeTask (id) {
        const response = await fetch (`${MAIN_URL}/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: TOKEN
            }
        });

        if (response.status !== 204) {
            throw new Error('Task were not delete');
        }

        return null;
    },
    async completeAllTasks (allTasks) {
        const response = await fetch (MAIN_URL, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                Authorization: TOKEN
            },
            body: JSON.stringify(
                allTasks,
            ),
        });

        if (response.status !== 200) {
            throw new Error('All tasks was not update');
        }

        const { data: tasks } = await response.json();

        return tasks;
    }
};
