import { useState, useEffect } from "react";
import HabitForm from "./components/HabitForm";
import HabitList from "./components/HabitList";
import HabitProgress from "./components/HabitProgress";

const App = () => {
  const [habits, setHabits] = useState([]);

  useEffect(() => {
    const savedHabits = JSON.parse(localStorage.getItem("habits")) || [];
    console.log("Loaded habits:", savedHabits);
    setHabits(savedHabits);
  }, []);

  useEffect(() => {
    console.log("Saving habits to LocalStorage:", habits);
    localStorage.setItem("habits", JSON.stringify(habits));
  }, [habits]);

  const addHabit = (habit) => {
    setHabits([...habits, habit]);
  };

  const toggleCompletion = (id) => {
    setHabits((prevHabits) =>
      prevHabits.map((habit) =>
        habit.id === id ? { ...habit, completed: !habit.completed } : habit
      )
    );
  };

  const deleteHabit = (id) => {
    setHabits((prevHabits) => prevHabits.filter((habit) => habit.id !== id));
  };

  return (
    <div className="app">
      <h1>Habit Tracker</h1>
      <HabitForm addHabit={addHabit} />
      <HabitProgress habits={habits} />
      <HabitList
        habits={habits}
        toggleCompletion={toggleCompletion}
        deleteHabit={deleteHabit}
      />
    </div>
  );
};

export default App;
