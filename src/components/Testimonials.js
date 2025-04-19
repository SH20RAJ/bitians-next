export default function Testimonials() {
  const testimonials = [
    {
      content: "BITians has completely transformed how I connect with my classmates and stay updated with campus events. It's become an essential part of my college life!",
      author: "Rahul Sharma",
      role: "Computer Science, 3rd Year",
    },
    {
      content: "The department groups feature has been incredibly helpful for sharing resources and getting help with assignments. I can't imagine campus life without it now.",
      author: "Priya Patel",
      role: "Electrical Engineering, 2nd Year",
    },
    {
      content: "As a club coordinator, the event management system has made organizing and promoting our events so much easier. We've seen a significant increase in participation!",
      author: "Amit Kumar",
      role: "Robotics Club Lead",
    },
  ];

  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-800 overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
              What students are saying
            </h2>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-600 dark:text-gray-300 sm:mt-4">
              Hear from the BIT Mesra community about their experience with our platform
            </p>
          </div>
          
          <div className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="flex flex-col rounded-lg shadow-lg overflow-hidden">
                <div className="flex-1 bg-white dark:bg-gray-900 p-6 flex flex-col justify-between">
                  <div className="flex-1">
                    <div className="text-sm font-medium text-primary-600 dark:text-primary-400">
                      <svg className="h-5 w-5 text-primary-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z" />
                      </svg>
                    </div>
                    <p className="mt-3 text-base text-gray-600 dark:text-gray-300">{testimonial.content}</p>
                  </div>
                  <div className="mt-6 flex items-center">
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center text-white font-bold">
                        {testimonial.author.charAt(0)}
                      </div>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{testimonial.author}</p>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
