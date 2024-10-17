import { useState } from "react";

const HabitForm = ({ addHabit }) => {
  const [habitName, setHabitName] = useState("");
  const [reminderTime, setReminderTime] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (habitName.trim() === "") return;

    const newHabit = {
      id: Date.now(),
      name: habitName,
      completed: false,
      lastCompleted: null,
      streak: 0,
      reminderTime,
    };

    addHabit(newHabit);
    setHabitName("");
    setReminderTime("");
  };

  return (
    <form onSubmit={handleSubmit} className="habit-form">
      <input
        type="text"
        placeholder="Enter a habit"
        value={habitName}
        onChange={(e) => setHabitName(e.target.value)}
      />
      <input
        type="time"
        value={reminderTime}
        onChange={(e) => setReminderTime(e.target.value)}
      />
      <button type="submit">Add Habit</button>
    </form>
  );
};

export default HabitForm;
