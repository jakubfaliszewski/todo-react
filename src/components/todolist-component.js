import React, { Component } from 'react';
import TaskComponent from './task-component';

import './todolist.css';
import './add-task.css';
import './task.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTasks, faPlus } from '@fortawesome/free-solid-svg-icons';
import { faCircle, faCheckCircle, faTimesCircle } from '@fortawesome/free-regular-svg-icons';

// import TaskListComponent from './task-list-component';
class TodoListComponent extends Component {
    constructor() {
        super();
        this.state = {
            task: {
                name: '',
                complete: false,
                date: null,
                id: this.generateShortGuid()
            },
            taskList: []
        };
    }

    generateShortGuid() {
        // I generate the UID from two parts here 
        // to ensure the random number provide enough bits.
        var firstPart = (Math.random() * 46656) | 0;
        var secondPart = (Math.random() * 46656) | 0;
        firstPart = ("000" + firstPart.toString(36)).slice(-3);
        secondPart = ("000" + secondPart.toString(36)).slice(-3);
        return firstPart + secondPart;
    }

    onSubmit = (event) => {
        event.preventDefault();
        this.setState({
            task: {
                name: '',
                complete: false,
                date: null,
                id: this.generateShortGuid()
            },
            taskList: [...this.state.taskList, this.state.task]
        });
    }

    onChange = (event) => {
        this.setState({
            task: {
                name: event.target.value,
                complete: false,
                date: new Date(),
                id: this.generateShortGuid()
            }
        });
    }

    generateList() {
        const taskList = this.state.taskList.map((task, index) =>
            this.renderTask(task, index)
        );

        return taskList;
    }

    renderTask(task, taskIndex) {
        let t = this;
        function setIcon(complete) {
            if (complete) {
                return <FontAwesomeIcon icon={faCheckCircle} className="complete" />
            }
            else {
                return <FontAwesomeIcon icon={faCircle} />
            }
        }

        function setState(complete) {
            if (complete) {
                return 'task complete'
            }
            else {
                return 'task'
            }
        }

        function compeleteTask(e) {
            e.preventDefault();
            let originalTaskList = t.state.taskList;
            originalTaskList[taskIndex].complete = !originalTaskList[taskIndex].complete;

            t.setState({
                taskList: originalTaskList
            });
        }

        function removeTask(e) {
            e.preventDefault();
            let originalTaskList = t.state.taskList;
            let returnList = originalTaskList.filter(t => t.id !== task.id);
            t.setState({
                taskList: returnList
            });

        }

        return (
            <li className={setState(this.state.taskList[taskIndex].complete)}>
                <span className="task-date">
                    {new Intl.DateTimeFormat('en-GB', {
                        year: 'numeric',
                        month: 'long',
                        day: '2-digit',
                    }).format(this.state.taskList[taskIndex].date)}
                </span>
                <button className="task-button" onClick={compeleteTask}>
                    {setIcon(this.state.taskList[taskIndex].complete)}
                </button>
                <p className="task-name">{this.state.taskList[taskIndex].name}</p>
                <button className="task-button warn" onClick={removeTask}>
                    <FontAwesomeIcon icon={faTimesCircle} />
                </button>
            </li>
        );
    }

    render() {
        let t = this;
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
                <ul>{this.generateList()}</ul>
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