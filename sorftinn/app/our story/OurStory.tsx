export default function OurStory() {
  const stats = [
    { number: "130+", label: "Years of Excellence" },
    { number: "200", label: "Luxury Suites" },
    { number: "98%", label: "Guest Satisfaction" },
    { number: "24/7", label: "Concierge Service" },
  ];

  return (
    <section className="relative  text-white overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0  pointer-events-none" />

      {/* Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-20 md:py-32">

        {/* ================= HEADER ================= */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <p className="text-amber-500 uppercase tracking-widest text-sm font-medium mb-4">
            Our Story
          </p>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-snug">
            A Legacy of Excellence
          </h2>

          <div className="w-24 h-1 bg-amber-500 mx-auto mt-6 rounded-full" />
        </div>

        {/* ================= STORY TEXT ================= */}
        <div className="max-w-4xl mx-auto text-center space-y-6 md:space-y-8 text-base md:text-base text-gray-300 leading-relaxed">
          <p>
            Nestled in the heart of the city, Sorfinn Hotel has been a beacon of refined hospitality{" "}
            <span className="text-amber-400 font-medium">since 1892</span>. Our commitment to
            impeccable service and timeless elegance has made us the preferred destination for
            discerning travelers seeking an extraordinary experience.
          </p>

          <p>
            Every detail, from our thoughtfully curated interiors to our personalized concierge
            service, reflects our dedication to creating unforgettable moments for our guests.
          </p>
        </div>

        {/* ================= STATS ================= */}
        <div className="mt-16 md:mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10 text-center">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="group transition-transform duration-500 hover:scale-105"
            >
              <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-amber-500 mb-2">
                {stat.number}
              </div>
              <p className="text-sm md:text-base font-medium text-gray-400 group-hover:text-gray-300 transition">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
