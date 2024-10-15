import { useState, useEffect } from "react";
import HabitForm from "./components/HabitForm";
import HabitList from "./components/HabitList";
import HabitProgress from "./components/HabitProgress";

const App = () => {
  const [habits, setHabits] = useState([]);

  useEffect(() => {
    const savedHabits = JSON.parse(localStorage.getItem("habits")) || [];
    setHabits(savedHabits);
  }, []);

  useEffect(() => {
    localStorage.setItem("habits", JSON.stringify(habits));
  }, [habits]);

  useEffect(() => {
    if (Notification.permission === "default") {
      Notification.requestPermission();
    }
  }, []);

  const addHabit = (habit) => {
    setHabits([...habits, habit]);
  };

  const toggleCompletion = (id) => {
    setHabits((prevHabits) =>
      prevHabits.map((habit) => {
        if (habit.id === id) {
          const today = new Date().toISOString().split("T")[0];
          let newStreak = habit.streak;
          if (!habit.completed) {
            if (habit.lastCompleted === today) {
              return habit;
            }
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            const yesterdayStr = yesterday.toISOString().split("T")[0];
            if (habit.lastCompleted === yesterdayStr) {
              newStreak += 1;
            } else {
              newStreak = 1;
            }
          } else {
            newStreak = habit.streak;
          }
          return {
            ...habit,
            completed: !habit.completed,
            lastCompleted: !habit.completed ? today : null,
            streak: newStreak,
          };
        }
        return habit;
      })
    );
  };

  const deleteHabit = (id) => {
    setHabits((prevHabits) => prevHabits.filter((habit) => habit.id !== id));
  };

  const setReminder = (id) => {
    const habit = habits.find((habit) => habit.id === id);
    if (!habit) return;

    const notificationTime = new Date();
    notificationTime.setSeconds(notificationTime.getSeconds() + 5); // Example: 5 seconds from now

    const delay = notificationTime - new Date();

    setTimeout(() => {
      if (Notification.permission === "granted") {
        new Notification("Habit Reminder", {
          body: `Don't forget to complete: ${habit.name}`,
        });
      }
    }, delay);
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
        setReminder={setReminder}
      />
    </div>
  );
};

export default App;
