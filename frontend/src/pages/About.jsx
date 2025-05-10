function About() {
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-4xl font-bold text-center mb-8">About This Project</h1>
        <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6 max-w-2xl mx-auto">
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            This project is a showcase of data structures and algorithms visualizations, built to demonstrate my skills in web development and algorithm design.
          </p>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Created by [Your Name], this site aims to help learners understand complex concepts through interactive and visually appealing animations.
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            Built with React, Tailwind CSS, and Canvas API. Feel free to explore and provide feedback!
          </p>
        </div>
      </div>
    );
  }
  
  export default About;