import React, { Component } from 'react';
import './task.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faCheckCircle } from '@fortawesome/free-regular-svg-icons';


class TaskComponent extends Component {

    constructor(prop) {
        super();
        this.state = {
            task: prop.task
        }
        console.log(this.state);

    }


    render() {
        let t = this;
        function setIcon(complete) {
            if (complete) {
                return <FontAwesomeIcon icon={faCheckCircle} className="complete" />
            }
            else {
                return <FontAwesomeIcon icon={faCircle} />
            }
        }

        function compeleteTask(e) {
            e.preventDefault();
            let originalTask = t.state.task; 
            originalTask.complete = !originalTask.complete;

            t.setState({
                task: originalTask
            });
        }

        return (
            <li className="task">
                <button className="task-button" onClick={compeleteTask}>
                    {setIcon(this.state.task.complete)}
                </button>
                <p>{this.state.task.name}</p>
            </li>
        );
    }
}

export default TaskComponent;