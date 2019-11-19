import React, { Component } from 'react';

import './todolist.css';
import './add-task.css';
import './task.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTasks, faPlus, faFilter } from '@fortawesome/free-solid-svg-icons';
import { faCircle, faCheckCircle, faTimesCircle } from '@fortawesome/free-regular-svg-icons';

// import TaskListComponent from './task-list-component';
class TodoListComponent extends Component {
    constructor() {
        super();

        function getItems() {
            let storagedItems = localStorage.getItem('todolist-tasks');
            let obj = JSON.parse(storagedItems)
            console.log(obj);
            if (obj && obj.length > 0) return obj;
            else return [];
        }

        this.state = {
            task: {
                name: '',
                complete: false,
                date: null,
                id: this.generateShortGuid()
            },
            taskList: getItems(),
            filterEnabled: false
        };
    }

    setItems() {
        setTimeout(() => {
            localStorage.setItem('todolist-tasks', JSON.stringify(this.state.taskList));
        }, 100)
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
        this.setItems();
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
            // if (task.complete == false)
            this.renderTask(task, index)
        );

        return taskList;
    }

    filterItems() {
        let changeFilter = !this.state.filterEnabled;
        this.setState({
            filterEnabled: changeFilter
        });
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
            t.setItems();
        }

        function removeTask(e) {
            e.preventDefault();
            let originalTaskList = t.state.taskList;
            let returnList = originalTaskList.filter(t => t.id !== task.id);
            t.setState({
                taskList: returnList
            });
            t.setItems();
        }

        if (this.state.filterEnabled ? this.state.taskList[taskIndex].complete : true) return (
            <li className={setState(this.state.taskList[taskIndex].complete)}>
                <span className="task-date">
                    {new Intl.DateTimeFormat('en-GB', {
                        year: 'numeric',
                        month: 'long',
                        day: '2-digit',
                    }).format(new Date(this.state.taskList[taskIndex].date))}
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

        function filterTasks(e) {
            e.preventDefault();
            t.filterItems();
        }

        let header = (
            <header className="window-header">
                <h1 className="window-header-name">
                    <FontAwesomeIcon className="window-header-icon" icon={faTasks} />
                    Todo List ({this.state.taskList.length})
              </h1>
                <button onClick={filterTasks} className={this.state.filterEnabled ? "window-header-button enabled" : "window-header-button"} >
                    <FontAwesomeIcon className="window-header-icon" icon={faFilter} />
                    Only completed
                    </button>
            </header>
        );
        let tasks = (
            <div className="tasks">
                <ul>{this.generateList()}</ul>
            </div>
        );
        let addTasks = (
            <form className="add-task" onSubmit={this.onSubmit}>
                <input required className="add-task-input" value={this.state.task.name} onChange={this.onChange}></input>
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