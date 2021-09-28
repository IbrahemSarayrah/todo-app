import React from 'react';
import { useContext, useState, useEffect } from 'react';
import { Card, Elevation, Button,ButtonGroup } from '@blueprintjs/core';
import { SettingsContext } from '../../context/settings'
import Auth from '../login/auth';

function List(props) {

    const settings = useContext(SettingsContext);

    const [pages, setPages] = useState([]);
    const [activePage, setActivePage] = useState([]);

    useEffect(() => {
        let start = 0;
        let end = settings.state.displayPerScreen;
        const pages = [];
        if (props.list.length >= settings.state.displayPerScreen) {
          while (props.list.length > start) {
            const page = props.list.slice(start, end);
            pages.push(page);
    
            start +=settings.state.displayPerScreen;
            end +=settings.state.displayPerScreen;
          }
          setPages([...pages]);
          setActivePage([...pages[0]]);
        }
      }, [props.list]);

      useEffect(() => {
        if (!settings.state.showComplete) {
          const items = props.list.filter((item) => item.complete === false);
          props.setList([...items]);
        }
      }, [settings.state.showComplete]);

      const list =  props.list.length >= settings.state.displayPerScreen ? activePage : props.list

    return (

        <div className={'cardDiv'}>
            {list.map(item => (
                <Card className={'cardlist'} interactive elevation={Elevation.FOUR} key={item.id}>
                    <p>{item.text}</p>
                    <p><small>Assigned to: {item.assignee}</small></p>
                    <p><small>Difficulty: {item.difficulty}</small></p>
                    <Auth capability="update">
                    <Button type="button" intent={item.complete ? 'success' : 'danger'} onClick={() => props.toggleComplete(item.id)}>Complete: {item.complete.toString()}</Button>
                    </Auth>
                    <Auth capability="delete">
                    <Button onClick={() => props.deleteItem(item.id)} type="button" intent={'danger'}> Delete Item</Button>
                    </Auth>
                    <hr />
                </Card>
            ))}
      { props.list
        && (
          <ButtonGroup>
            { pages.map((page, index) => (
              <Button
                key={pages.indexOf(page)}
                onClick={() => setActivePage(pages[index])}
              >
                {pages.indexOf(page) + 1}
              </Button>
            ))}
          </ButtonGroup>
        )}
        </div>
    )
}

export default List;