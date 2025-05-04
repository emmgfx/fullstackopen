export const Course = ({ course }) => {

  const exercisesCount = course.parts.reduce((prevCount, part) => {
    return prevCount + part.exercises;
  }, 0);

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total exercisesCount={exercisesCount} />
    </div>

  );
}

const Header = ({ course }) => {
  return <h1>{course}</h1>;
};

const Content = ({ parts }) => {
  return (
    parts.map((part) => {
      return <Part key={part.id} part={part.name} exercises={part.exercises} />
    })
  );
};

const Part = ({ part, exercises }) => {
  return (
    <p>
      {part} {exercises}
    </p>
  );
};

const Total = ({ exercisesCount }) => {
  return <p><strong>Total of {exercisesCount} exercises</strong></p>;
};
