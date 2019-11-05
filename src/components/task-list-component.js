import React, { Component } from 'react';
import TaskComponent from './task-component';


class TaskListComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tasks: props.tasks
        };
    }
    componentWillReceiveProps(nextProps) {
        this.setState({ tasks: nextProps.tasks });
    }

    listTasks() {
        const taskList = this.state.tasks.map((task) =>
            <TaskComponent task={task} />
        );

        return taskList;
    }


    render() {
        return (
            <ul>{this.listTasks()}</ul>
        );
    }
};


export default TaskListComponent;