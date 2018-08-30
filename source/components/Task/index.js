// Core
import React, { PureComponent } from 'react';
import Checkbox from '../../theme/assets/Checkbox';
import Star from '../../theme/assets/Star';
import Edit from '../../theme/assets/Edit';
import Remove from '../../theme/assets/Remove';

// Instruments
import Styles from './styles.m.css';

export default class Task extends PureComponent {
    _getTaskShape = ({
        id = this.props.id,
        completed = this.props.completed,
        favorite = this.props.favorite,
        message = this.props.message,
    }) => ({
        id,
        completed,
        favorite,
        message,
    });

    state = {
        isCompleted: false,
        isDisabled: true,
    };


    _setTaskEditingState = () => {
        const { isDisabled } = this.state;

        this.setState({
            isDisabled: !isDisabled,
        });
    };

    _updateTask = () => {

    };

    _updateNewTaskMessage = (event) => {
        const { value } = event.target;
        const { _updateTaskAsync } = this.props;
        const enterKey = event.key === 'Enter';

        const taskToUpdate = this._getTaskShape({ message: value });

            _updateTaskAsync(taskToUpdate);

    };

    _updateTaskMessageOnClick = () => {
        this._setTaskEditingState();
    };

    _cancelUpdatingTaskMessage = () => {

    };

    _updateTaskMessageOnKeyDown = () => {

    };

    _toggleTaskCompletedState = () => {

        const { _updateTaskAsync, completed } = this.props;

        const taskToUpdate = this._getTaskShape({ completed: !completed });

        _updateTaskAsync(taskToUpdate);

    };

    _toggleTaskFavoriteState = () => {
        const { _updateTaskAsync, favorite } = this.props;

        const taskToUpdate = this._getTaskShape({ favorite: !favorite });

        _updateTaskAsync(taskToUpdate);
    };

    _removeTask = () => {
        const { id, _removeTaskAsync } = this.props;

        _removeTaskAsync(id);
    };

    render () {
        const { id, completed, message, favorite } = this.props;
        const { isCompleted, isDisabled } = this.state;

        return (
            <li className = { Styles.task }>
                <div className = { Styles.content }>
                    <Checkbox
                        id = { id }
                        checked = { completed }
                        className = { Styles.toggleTaskCompletedState }
                        color1 = '#3B8EF3'
                        color2 = '#FFF'
                        inlineBlock
                        onClick = { this._toggleTaskCompletedState }
                    />
                    <input
                        disabled = { isDisabled }
                        maxLength = { 50 }
                        type = 'text'
                        value = { message }
                        onChange = { this._updateNewTaskMessage }
                    />
                </div>
                <Star
                    checked = { favorite }
                    onClick = { this._toggleTaskFavoriteState }
                />
                <Edit
                    className = { Styles.updateTaskMessageOnClick }
                    onClick = { this._updateTaskMessageOnClick }
                />
                <Remove
                    inlineBlock
                    checked = { false }
                    className = { Styles.removeTask }
                    color1 = '#3B8EF3'
                    color2 = '#000'
                    onClick = { this._removeTask }
                />
            </li>
        );
    }
}
