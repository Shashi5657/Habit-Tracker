import { useState } from "react";

const HabitForm = ({ addHabit }) => {
  const [habitName, setHabitName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (habitName.trim() === "") return;

    const newHabit = {
      id: Date.now(),
      name: habitName,
      completed: false,
    };

    addHabit(newHabit);
    setHabitName("");
  };

  return (
    <form onSubmit={handleSubmit} className="habit-form">
      <input
        type="text"
        placeholder="Enter a habit"
        value={habitName}
        onChange={(e) => setHabitName(e.target.value)}
      />
      <button type="submit">Add Habit</button>
    </form>
  );
};

export default HabitForm;
