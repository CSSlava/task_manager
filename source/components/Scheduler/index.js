// Core
import React, { Component } from 'react';
import { string } from 'prop-types';

// Instruments
import Styles from './styles.m.css';
import Task from '../Task';
import Spinner from '../Spinner';
import Checkbox from '../../theme/assets/Checkbox';
import { api } from '../../REST'; // ! Импорт модуля API должен иметь именно такой вид (import { api } from '../../REST')

export default class Scheduler extends Component {
    // static propTypes = {
    //     tasksFilter: string.isRequired,
    //     newTaskMessage: string.isRequired,
    // };

    static defaultProps = {
        tasks: ['defaultProps'],
    };

    state = {
        tasks: [],
        isTasksFetching: false,
        tasksFilter: '',
        newTaskMessage: '',
        checkedAll: false,
    };

    componentDidMount () {
        this._fetchTasksAsync();
    }

    _updateTasksFilter = (event) => {
        const { value } = event.target;

        this.setState({
            tasksFilter: value,
        });
    };

    _updateNewTaskMessage = (event) => {
        const { value } = event.target;

        this.setState({
            newTaskMessage: value,
        });
    };

    _getAllCompleted = () => {
        // const { tasks } = this.state;
        //
        // this.setState(({ tasks }) => ({
        //     tasks: tasks.map((task) => task.completed = 'true'),
        //
        // }));

        // this._completeAllTasksAsync(tasks);
    };

    _setTasksFetchingState = (isTasksFetching) => {
        this.setState({
            isTasksFetching,
        });
    };

    _fetchTasksAsync = async () => {
        try {
            this._setTasksFetchingState(true);

            const tasks = await api.fetchTasks();

            this.setState(() => ({
                tasks,
            }));
        } catch (error) {
            console.error(error);
        } finally {
            this._setTasksFetchingState(false);
        }
    };

    _createTaskAsync = async (event) => {
        const { newTaskMessage } = this.state;

        event.preventDefault();

        if (!newTaskMessage.trim()) {
            return null;
        }

        try {
            this._setTasksFetchingState(true);

            const task = await api.createTask(newTaskMessage);

            this.setState((prevState) => ({
                tasks: [
                    task,
                    ...prevState.tasks
                ],
                newTaskMessage: '',
            }));
        } catch (error) {
            console.error(error);
        } finally {
            this._setTasksFetchingState(false);
        }
    };

    _updateTaskAsync = async (taskToUpdate) => {
        try {
            this._setTasksFetchingState(true);

            const checkedTask = await api.updateTask(taskToUpdate);

            this.setState(({ tasks }) => ({
                tasks: tasks.map((task) => task.id === checkedTask.id ? checkedTask : task)
            }));
        } catch (error) {
            console.error(error);
        } finally {
            this._setTasksFetchingState(false);
        }
    };

    _removeTaskAsync = async (id) => {
        try {
            this._setTasksFetchingState(true);

            await api.removeTask(id);

            this.setState(({ tasks }) => ({
                tasks: tasks.filter((task) => task.id !== id),
            }));
        } catch (error) {
            console.error(error);
        } finally {
            this._setTasksFetchingState(false);
        }
    };

    _completeAllTasksAsync = async () => {
        const { tasks, checkedAll } = this.state;

        this.setState(() => ({
            checkedAll: !checkedAll,
        }));
        //
        // this.setState(({ tasks }) => ({
        //     tasks: tasks.map((task) => task.completed = 'true'),
        // }))
        //
        try {
            this._setTasksFetchingState(true);

            const test = await api.completeAllTasks(tasks);

            this.setState(() => ({
                test,
            }));

        } catch (error) {
            console.error(error);
        } finally {
            this._setTasksFetchingState(false);
        }
    };

    render () {
        const { tasks, isTasksFetching, tasksFilter, newTaskMessage, checkedAll } = this.state;

        const tasksJSX = tasks.map((task) => (
            <Task
                key = { task.id }
                { ...task }
                _removeTaskAsync = { this._removeTaskAsync }
                _updateTaskAsync = { this._updateTaskAsync }
            />
        ));

        return (
            <section className = { Styles.scheduler }>

                <main>
                    <Spinner isSpinning = { isTasksFetching } />
                    <header>
                        <h1>Планировщик задач</h1>
                        <input
                            type = 'search'
                            placeholder = 'Поиск'
                            value = { tasksFilter }
                            onChange = { this._updateTasksFilter }
                        />
                    </header>
                    <section>
                        <form
                            onSubmit = { this._createTaskAsync }
                        >
                            <input
                                className = { Styles.createTask }
                                maxLength = { 50 }
                                placeholder = { `Описание моей новой задачи` }
                                type = 'text'
                                value = { newTaskMessage }
                                onChange = { this._updateNewTaskMessage }
                            />
                            <button type = 'submit'>Добавить задачу</button>
                        </form>
                        <div className = { Styles.overlay }>
                            <ul>
                                { tasksJSX }
                            </ul>
                        </div>
                    </section>
                    <footer>
                        <Checkbox
                            inlineBlock
                            checked = { checkedAll }
                            color1 = '#3B8EF3'
                            color2 = '#FFF'
                            onClick = { this._completeAllTasksAsync }
                        />
                        <span className = { Styles.completeAllTasks }>Все задачи выполнены</span>
                    </footer>


                </main>
            </section>
        );
    }
}
