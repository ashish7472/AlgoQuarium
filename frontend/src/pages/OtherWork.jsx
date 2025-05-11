import golocal from '../assets/golocal.avif'
import yt from '../assets/yt.jpg'
import reversible from '../assets/reversible.jpg'
import portfolio from '../assets/portfolio.avif'

function OtherWork() {
  const projects = [
    {
      name: 'GoLocal',
      description:
        'A MERN Stack web application that connects local shopkeepers (service providers) with customers. Shopkeepers can list their businesses, and customers can search for nearby services based on location, category, and filters.',
      githubLink: 'https://github.com/GoLocalTeam/GoLocal',
      // liveLink: '',
      image: golocal,
      imageAlt: 'A screenshot of the GoLocal application showing a list of local services',
      isCurrent: true, // Flag for "Currently Working"
    },
    {
      name: 'Youtube Annotation Extension',
      description:
        'YouTube Annotation is a important note taking chrome extension for any video at particular timestamp. And it also help to export all notes in json file.',
      githubLink: 'https://github.com/ashish7472/YT_Annotation',
      // liveLink: '',
      image: yt,
      imageAlt: 'A screenshot of the Youtube Annotation Extension showing a video with annotations',
      isCurrent: false,
    },
    {
      name: 'Reversible Data Hiding',
      description:
        'A reversible data hiding project that allows embedding secret messages into images without noticeable changes. The hidden data can be extracted without any loss of the original image quality.',
      githubLink: 'https://github.com/ashish7472/Reversible_Data_Hiding',
      liveLink: 'https://reversible-data-hiding-1.onrender.com/',
      image: reversible,
      imageAlt: 'A screenshot of the Reversible Data Hiding application showing an image with hidden data',
      isCurrent: false,
    },
    {
      name: 'Portfolio Website',
      description:
        'A personal portfolio website showcasing my projects, skills, and contact information. Built with React and Tailwind CSS.',
      // githubLink: '',
      liveLink: 'https://ashish-rolan-portfolio.netlify.app/',
      image: portfolio,
      imageAlt: 'A screenshot of the Portfolio Website showing the homepage',
      isCurrent: false,
    },
  ];

  return (
    <div className="container mx-auto p-4 md:p-6 min-h-[calc(100vh-8rem)]">
      <h1 className="text-2xl md:text-4xl font-bold text-center mb-6 md:mb-8 text-white">Other Work</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {projects.map((project, index) => (
          <div
            key={index}
            className="relative bg-[#2c3e50] rounded-lg shadow-md p-4 md:p-6 border border-[#3b4a6b] flex flex-col items-center text-center transition-transform duration-300 hover:scale-105 hover:shadow-lg"
          >
            {/* Currently Working Flag */}
            {project.isCurrent && (
              <span className="absolute top-2 right-2 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded">
                Currently Working
              </span>
            )}
            {/* Project Image */}
            <img
              src={project.image}
              alt={project.imageAlt}
              className="w-full h-32 md:h-40 object-cover rounded-md mb-4"
            />
            {/* Project Name */}
            <h3 className="text-lg md:text-xl font-semibold text-white mb-2">{project.name}</h3>
            {/* Project Description */}
            <p className="text-[#b0b8c4] text-sm md:text-base mb-4">{project.description}</p>
            {/* Links */}
            <div className="flex space-x-4">
              {project.githubLink && (
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#4a90e2] hover:underline text-sm md:text-base"
                >
                  GitHub
                </a>
              )}
              {project.liveLink && (
                <a
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#4a90e2] hover:underline text-sm md:text-base"
                >
                  Live Demo
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OtherWork;