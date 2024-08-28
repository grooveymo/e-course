const About = () => {
  return (
    <>
      <h1>About</h1>

      <div>
        <p>
          This is a sample CRUD app designed to help you manage your e-courses.
          Easily add, edit, and delete courses, track your progress, and get an
          overview of your overall learning.
        </p>
        <p>
          <h2>Features</h2>
          <ul>
            <li>Add, edit, and delete courses</li>
            <li>Track course duration and progress</li>
            <li>View a KPI overview of your learning</li>
          </ul>
        </p>
        <p>
          <h2>How to Use:</h2>
          <ol>
            <li>
              Log in by providing any username and password, as long as they are
              the same.
            </li>
            <li>
              Add your e-courses by entering the name, duration, and total
              modules.
            </li>
            <li>Update your progress as you complete modules.</li>
            <li>View your KPI overview to see your overall learning status.</li>
          </ol>
        </p>
      </div>
    </>
  );
};

export default About;
