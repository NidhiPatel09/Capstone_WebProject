export default function UserStories() {
  const stars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => {
      const starValue = index + 1;
      return (
        <div className="flex items-center">
          <svg
            className="w-4 h-4 text-yellow-300 ms-1"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 22 20"
          >
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
          </svg>
        </div>
      );
    });
  };

  const stories = [
    {
      title: "Golden Spoon",
      description:
        "Awarded for exceptional recipe innovation and community engagement in 2023.",
      rating: 4.5,
    },
    {
      title: "Healthy Choice",
      description:
        "Recognized for providing healthy and nutritious recipe options in 2022.",
      rating: 5,
    },
    {
      title: "Best UX",
      description:
        "Celebrated for an outstanding user interface and seamless navigation in 2023.",
      rating: 5,
    },
  ];

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">
          Our User Stories
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stories.map((story, index) => {
            const { title, description, rating } = story;
            return (
              <div key={index} className="bg-white shadow-lg rounded-lg p-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-bold text-xl">{title}</h3>
                  <div className="flex items-center">{stars(rating)}</div>
                </div>
                <p className="text-gray-700">{description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
