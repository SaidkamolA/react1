import './App.css';
import React, { useState, useEffect } from 'react';

function App() {
  const date = new Date();

  const [submittedData, setSubmittedData] = useState({ name: '', age: '' });
  
  const [darkMode, setDarkMode] = useState(false);

  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());


  let names = ['Asian', 'Said', 'Danil'];


  let products = [
    { name: 'Product 1', price: 100, count: 2 },
    { name: 'Product 2', price: 200, count: 3 },
    { name: 'Product 3', price: 150, count: 1 },
  ];
  

  function button_onsubmit(event) {
    event.preventDefault();
    let name = document.getElementById('name').value;
    let age = document.getElementById('age').value;
    setSubmittedData({ name, age });
  }

  function toggleDarkMode() {
    const newTheme = !darkMode;
    setDarkMode(newTheme);
    localStorage.setItem('darkMode', newTheme);
    document.body.classList.toggle('dark-mode', newTheme);
    document.body.classList.toggle('light-mode', !newTheme);
  }

  useEffect(() => {
    const savedTheme = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedTheme);
    document.body.classList.toggle('dark-mode', savedTheme);
    document.body.classList.toggle('light-mode', !savedTheme);
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  function getDayInfo() {
    const today = new Date();
    const day = today.getDate();

    if (day % 2 === 0) {
      return `${today.getMonth() + 1}/${today.getFullYear()}`;
    } else {
      return today.toLocaleString('en-US', { weekday: 'long' }) + `, ${day}`;
    }
  }

  return (
    <>
      {/* <h1 className='my_class'>Hello world</h1>
      <p>{date.toLocaleDateString()}</p>

      {names.length > 5 ? <div>MORE</div> : <div>LESS</div>}

      {names.map((e) => {
        return <div key={e}>{e}</div>;
      })} */}

      <form onSubmit={button_onsubmit}>
        Имя:
        <input type='text' placeholder='name' id='name'></input>
        Возраст:
        <input type='number' placeholder='age' id='age'></input>
        <button type='submit'>Отправить</button>
      </form>

      <div style={{ position: 'absolute', top: 0, right: 0 }}>
        {submittedData.name && (
          <>
            <p>Name: {submittedData.name}</p>
            <p>Age: {submittedData.age}</p>
          </>
        )}
      </div>


      <div className="cards-container">
      {products.map((product, index) => (
        <div key={index} className="card">
          <h3>{product.name}</h3>
          <p>Price: ${product.price}</p>
          <p className="count">Count: {product.count}</p>
        </div>
      ))}
    </div>

      
      <button onClick={toggleDarkMode}>
        {darkMode ? 'Переключитсья на светлую тему' : 'Переключитсья на темную тему'}
      </button>

      <h2>Текущее время: {currentTime}</h2>
      <h2>Информация о сегодняшнем дне: {getDayInfo()}</h2>
    </>
  );
}

export default App;
