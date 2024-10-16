const HabitList = ({ habits, toggleCompletion, deleteHabit, setReminder }) => {
  return (
    <div className="habit-list">
      {habits.map((habit) => (
        <div
          key={habit.id}
          className={`habit-item ${habit.completed ? "completed" : ""}`}
        >
          <span onClick={() => toggleCompletion(habit.id)}>{habit.name}</span>
          <span className="streak">Streak: {habit.streak}</span>
          <button onClick={() => deleteHabit(habit.id)}>Delete</button>
          <button onClick={() => setReminder(habit.id)}>Set Reminder</button>
        </div>
      ))}
    </div>
  );
};

export default HabitList;
