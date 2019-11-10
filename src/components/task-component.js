import React, { Component } from 'react';



class TaskComponent extends Component {

    constructor(prop) {
        super();
        this.state = {
            task: prop.task
        }
        console.log(this.state);

    }


    
}

export default TaskComponent;