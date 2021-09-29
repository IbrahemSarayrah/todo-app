import React, { useEffect, useState, useContext } from 'react';
import useForm from '../../hooks/form.js';
import superagent from "superagent";
import { AuthContext } from "../../context/authentication";


import { v4 as uuid } from 'uuid';
import List from '../list/list.js';
import Form from '../form/form.js';
import Header from '../header/header.js';

const additem = 'https://todo-api02.herokuapp.com';

const ToDo = () => {

  const context = useContext(AuthContext);
  
  const [list, setList] = useState([]);
  const [incomplete, setIncomplete] = useState([]);
  const { handleChange, handleSubmit } = useForm(addItem);

   async function addItem(item) {
    console.log(list);
    item.id = uuid();
    item.complete = false;
    // setList([...list, item]);

      console.log(context.token);

      let obj = {
        toDoItem: item.text,
        assignedTo:item.assignee,
        difficulty:item.difficulty,
        toDoid:item.id,
        complete:item.complete,
      }
    try {
      console.log(item.text);
      const res = await superagent.post(`${additem}/api/v2/toDo`)
      .send(obj)
      .set('Authorization', 'Bearer ' + context.token)
      console.log(res);
      // setList([...list, res.body]);
      console.log(list);
  } catch (error) {
      alert('Invalid data');
  }
  }

  useEffect( async () => {
    try {
      const res = await superagent.get(`${additem}/api/v2/toDo`)
      .set('Authorization', 'Bearer ' + context.token)
      // const result = res.map(item =>{
        //   console.log(item);
        setList(res.body)
        console.log(res);
      // })
      // return result
  } catch (error) {
      alert('Invalid Render');
  }

  }, []);

  async function deleteItem(toDoid) {
    console.log(toDoid);
    try {
      const res = await superagent.delete(`${additem}/api/v2/toDo/${toDoid}`)
      .set('Authorization', 'Bearer ' + context.token)
      const items = list.filter(item => item.toDoid !== toDoid);
      setList(items);
      console.log("items>>>>",items);
      console.log("delete",res);
      // setList(res.body);
  } catch (error) {
      alert('Invalid delete');
  }

  }

  async function toggleComplete(toDoid) {
      console.log(toDoid);
    const items = list.map(item => {
      if (item.id == toDoid) {
        item.complete = !item.complete;
      }
      return item;
    });
    // console.log(items[0].complete);
    let obj = {
      complete:items[0].complete
    }
    const res = await superagent.put(`${additem}/api/v2/toDo/${toDoid}`)
    .send(obj)
    .set('Authorization', 'Bearer ' + context.token)
    // setList(res.body)
    // console.log(res,body);
  }

  useEffect(() => {
    let incompleteCount = list.filter(item => !item.complete).length;
    setIncomplete(incompleteCount);
    document.title = `To Do List: ${incomplete}`;
  }, [list]);

  return (
    <>
      <Header/>
      <header className="toDoHeader">
        <h2>To Do List: {incomplete} items pending</h2>
      </header>
      <div className="content">
      <Form handleSubmit={handleSubmit} handleChange={handleChange}  />
      <List toggleComplete={toggleComplete} list={list} deleteItem={deleteItem} setList={setList}/>
      </div>
    </>
  );
};

export default ToDo;
