function Testimonials() {
  const testimonials = [
    {
      name: 'Alex Johnson',
      image: 'https://i.pravatar.cc/150?img=1', // Placeholder image
      imageAlt: 'A circular avatar of a smiling person with short brown hair',
      review:
        'This website made learning algorithms so much easier! The visualizations are clear and engaging, and I love how I can control the speed and array size.',
    },
    {
      name: 'Sofia Martinez',
      image: 'https://i.pravatar.cc/150?img=2',
      imageAlt: 'A circular avatar of a person with long black hair wearing glasses',
      review:
        'As a beginner in data structures, I found this site incredibly helpful. The step-by-step animations and code snippets are fantastic for understanding complex concepts.',
    },
    {
      name: 'Liam Chen',
      image: 'https://i.pravatar.cc/150?img=3',
      imageAlt: 'A circular avatar of a person with short black hair and a friendly smile',
      review:
        'I’ve been using this website to prepare for coding interviews, and it’s been a game-changer. The variety of sorting, path-finding algorithms and their visualizations are top-notch!',
    },
    {
      name: 'Emma Davis',
      image: 'https://i.pravatar.cc/150?img=4',
      imageAlt: 'A circular avatar of a person with curly blonde hair and a bright expression',
      review:
        'The design of this website is sleek and intuitive. I especially appreciate the dark theme and how the visualizations highlight the algorithms steps. Highly recommend!',
    },
  ];

  return (
    <div className="container mx-auto p-4 md:p-6 min-h-[calc(100vh-8rem)]">
      <h1 className="text-2xl md:text-4xl font-bold text-center mb-6 md:mb-8 text-white">Testimonials</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="bg-[#2c3e50] rounded-lg shadow-md p-4 md:p-6 border border-[#3b4a6b] flex flex-col items-center text-center"
          >
            <img
              src={testimonial.image}
              alt={testimonial.imageAlt}
              className="w-16 h-16 md:w-20 md:h-20 rounded-full mb-4 border-2 border-[#4a90e2]"
            />
            <h3 className="text-lg md:text-xl font-semibold text-white mb-2">{testimonial.name}</h3>
            <p className="text-[#b0b8c4] text-sm md:text-base">{testimonial.review}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Testimonials;