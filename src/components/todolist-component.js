import React, { Component } from 'react';
import TaskComponent from './task-component';

import './todolist.css';
import './add-task.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTasks, faPlus } from '@fortawesome/free-solid-svg-icons';
import TaskListComponent from './task-list-component';
class TodoListComponent extends Component {

    constructor() {
        super();
        this.state = {
            task: {
                name: '',
                complete: false,
                date: null
            },
            taskList: []
        };
    }

    onSubmit = (event) => {
        event.preventDefault();

        this.setState({
            task: {
                name: '',
                complete: false,
                date: null
            },
            taskList: [...this.state.taskList, this.state.task]
        });
    }

    onChange = (event) => {
        this.setState({ task:{
            name: event.target.value,
            complete: false,
            date: new Date()
        }  });
    }

    render() {
        let header = (
            <header className="window-header">
                <h1 className="window-header-name">
                    <FontAwesomeIcon className="window-header-icon" icon={faTasks} />
                    Todo List ({this.state.taskList.length})
              </h1>
            </header>
        );

        let tasks = (
            <div className="tasks">
                <TaskListComponent tasks={this.state.taskList}/>
            </div>
        );
        let addTasks = (
            <form className="add-task" onSubmit={this.onSubmit}>
                <input className="add-task-input" value={this.state.task.name} onChange={this.onChange}></input>
                <button className="add-task-button">
                    <FontAwesomeIcon icon={faPlus} />
                </button>
            </form>
        );

        let body = (
            <main className="window-body">
                {tasks}
                {addTasks}
            </main>
        );




        return (
            <div className="app">
                <section className="window">
                    {header}
                    {body}
                </section>
            </div>
        );

    }
};


export default TodoListComponent;