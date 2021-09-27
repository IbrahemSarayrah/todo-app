import React, { useEffect, useState } from 'react';
import useForm from '../../hooks/form.js';

import { v4 as uuid } from 'uuid';
import List from '../list/list.js';
import Form from '../form/form.js';
import Header from '../header/header.js';

const ToDo = () => {

  const [list, setList] = useState([]);
  const [incomplete, setIncomplete] = useState([]);
  const { handleChange, handleSubmit } = useForm(addItem);

  function addItem(item) {
    console.log(item);
    item.id = uuid();
    item.complete = false;
    setList([...list, item]);
  }

  function deleteItem(id) {
    const items = list.filter(item => item.id !== id);
    setList(items);
  }

  function toggleComplete(id) {

    const items = list.map(item => {
      if (item.id == id) {
        item.complete = !item.complete;
      }
      return item;
    });

    setList(items);

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
