const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ sum }) => <p>Number of exercises {sum}</p>

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => 
  <>
    {parts.map(part =>
    <Part key={part.id} part={part} />
    )}
  </>

const Course = ({course}) => {
    const sum = course.parts.reduce(
      (previousValue, currentValue) => previousValue + currentValue.exercises, 0
    );

    return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total sum={sum} />
    </div>
  )
}

export default Course