import React from 'react';
import { useContext, useState } from 'react';
import { Card, Elevation, Button } from '@blueprintjs/core';
import { SettingsContext } from '../../context/settings'

function List(props) {

    const settings = useContext(SettingsContext)

    const [startPage, setStartPage] = useState(0);
    const [endPage, setEndPage] = useState(settings.state.displayPerScreen);

    function setPages() {
        let page = props.list.slice(startPage, endPage);
        return page;
    }

    function nextPage() {
        setStartPage(startPage + settings.state.displayPerScreen);
        setEndPage(endPage + settings.state.displayPerScreen);
    }

    function previousPage() {
        setStartPage(startPage - settings.state.displayPerScreen);
        setEndPage(endPage - settings.state.displayPerScreen);
    }

    return (

        <div className={'cardDiv'}>
            {setPages(0).map(item => (
                <Card className={'cardlist'} interactive elevation={Elevation.FOUR} key={item.id}>
                    <p>{item.text}</p>
                    <p><small>Assigned to: {item.assignee}</small></p>
                    <p><small>Difficulty: {item.difficulty}</small></p>
                    <Button type="button" intent={item.complete ? 'success' : 'danger'} onClick={() => props.toggleComplete(item.id)}>Complete: {item.complete.toString()}</Button>
                    <Button onClick={() => props.deleteItem(item.id)} type="button" intent={'danger'}> Delete Item</Button>
                    <hr />
                </Card>
            ))}
            <div>
                <Button onClick={() => previousPage()}>Previous</Button>
                <Button onClick={() => nextPage()}>Next</Button>
            </div>
        </div>
    )
}

export default List;