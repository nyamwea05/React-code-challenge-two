import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [bots, setBots] = useState([]);
  const [enlistedBots, setEnlistedBots] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/bots").then((response) => {
      setBots(response.data);
    });
  }, []);

  function enlistBot(bot) {
    if (!enlistedBots.includes(bot)) {
      setEnlistedBots([...enlistedBots, bot]);
    }
  }

  function releaseBot(bot) {
    setEnlistedBots(enlistedBots.filter((b) => b !== bot));
  }

  function deleteBot(bot) {
    axios.delete(`http://localhost:3000/bots/${bot.id}`).then(() => {
      setBots(bots.filter((b) => b.id !== bot.id));
      setEnlistedBots(enlistedBots.filter((b) => b.id !== bot.id));
    });
  }

  function renderBot(bot) {
    return (
      <div key={bot.id}>
        <h3>{bot.name}</h3>
        <p>Class: {bot.class}</p>
        <p>Health: {bot.health}</p>
        <p>Damage: {bot.damage}</p>
        <p>Armor: {bot.armor}</p>
        <button onClick={() => enlistBot(bot)}>Enlist</button>
      </div>
    );
  }

  function renderEnlistedBot(bot) {
    return (
      <div key={bot.id}>
        <h3>{bot.name}</h3>
        <p>Class: {bot.class}</p>
        <p>Health: {bot.health}</p>
        <p>Damage: {bot.damage}</p>
        <p>Armor: {bot.armor}</p>
        <button onClick={() => releaseBot(bot)}>Release</button>
      </div>
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Bot Army</h1>
      </header>
      <main>
        <section>
          <h2>Available Bots</h2>
          {bots.map((bot) => renderBot(bot))}
        </section>
        <section>
          <h2>Your Bot Army</h2>
          {enlistedBots.map((bot) => renderEnlistedBot(bot))}
          <button onClick={() => setEnlistedBots([])}>
            Clear Your Bot Army
          </button>
        </section>
        <section>
          <h2>Bot Collection</h2>
          {bots.map((bot) => (
            <div key={bot.id}>
              <h3>{bot.name}</h3>
              <p>Class: {bot.class}</p>
              <p>Health: {bot.health}</p>
              <p>Damage: {bot.damage}</p>
              <p>Armor: {bot.armor}</p>
              <button onClick={() => window.location = `/bot/${bot.id}`}>View Details</button>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}

export default App;
