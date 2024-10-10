const HabitProgress = ({ habits }) => {
  const completedCount = habits.filter((habit) => habit.completed).length;
  const totalCount = habits.length;
  const progressPercentage =
    totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  return (
    <div className="habit-progress">
      <div className="progress-bar">
        <div
          className="progress"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
      <p>
        {completedCount} / {totalCount} habits completed
      </p>
    </div>
  );
};

export default HabitProgress;
