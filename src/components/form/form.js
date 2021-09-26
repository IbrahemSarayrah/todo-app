import React from 'react';
import {
    Card,
    FormGroup,
    InputGroup,
    Button,
    Elevation,
} from '@blueprintjs/core';

function Form(props) {

    return (

        <Card className="cardForm" interactive elevation={Elevation.FOUR}>
            <form onSubmit={props.handleSubmit}>
                <FormGroup>
                <h2>Add To Do Item</h2>

                <label>
                    <span>To Do Item</span>
                    <InputGroup onChange={props.handleChange} intent={'primary'} name="text" type="text" placeholder="Item Details" />
                </label>
                    <br/>
                <label>
                    <span>Assigned To</span>
                    <InputGroup onChange={props.handleChange} intent={'primary'} name="assignee" type="text" placeholder="Assignee Name" />
                </label>

                <label>
                    <br />
                    <span>Difficulty</span>
                    <br />
                    <input onChange={props.handleChange} intent={'primary'} defaultValue={3} type="range" min={1} max={5} name="difficulty" />
                </label>
                <br/> <br/>
                <label>
                    <Button className="bp3-button bp3-icon-add" intent={'primary'} type="submit">Add Item</Button>
                </label>
                </FormGroup>
            </form>
        </Card>
    )
}

export default Form;