function About() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-8 text-white">About This Website</h1>
      <div className="bg-[#2c3e50] rounded-lg shadow-md p-6 max-w-2xl mx-auto">
        <p className="text-[#b0b8c4] mb-4">
          This project is a visualization tool for various sorting algorithms, designed to help users understand how these algorithms work through interactive animations.
        </p>
        <p className="text-[#b0b8c4] mb-4">
          Created by Ashish Rolan, it features dynamic animations and intuitive interfaces to help learners explore and understand how algorithms work. Through hands-on interaction, algorithms such as sorting, searching, and pathfinding, all brought to life with clear, visually appealing representations.
        </p>
        <p className="text-[#b0b8c4]">
          Built with React, Tailwind CSS, and Canvas API. Feel free to explore and provide feedback!
        </p>
      </div>
    </div>
  );
}

export default About;