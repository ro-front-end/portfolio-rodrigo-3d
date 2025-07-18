import { LinkButtonPrimary } from "@/components/ui/links";
import Image from "next/image";
import Link from "next/link";

function About() {
  return (
    <section className="relative min-h-[80vh] md:min-h-[90vh] flex items-center justify-center p-6">
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"></div>

      <div className="relative z-10 text-center max-w-6xl mx-auto flex flex-col md:flex-row gap-8 lg:gap-12">
        <div className="flex justify-center md:justify-start w-full md:w-1/2">
          <Image
            className="w-64 h-64 sm:w-72 sm:h-72 rounded-full border-4 border-white shadow-lg"
            src="/about-two.png"
            alt="Profile picture of Rodrigo Arellano"
            width={288}
            height={288}
            quality={40}
          />
        </div>

        {/* Right Column: Text and Details */}
        <div className="w-full md:w-1/2 flex flex-col gap-6 text-left">
          {/* Title */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tighter text-white">
            About Me
          </h2>

          {/* Bio */}
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300">
            I am a passionate Full-Stack developer with a focus on building
            high-performance web applications. My expertise lies in creating
            scalable, accessible, and visually appealing solutions tailored to
            client needs. I prioritize clean code, user-friendly navigation, and
            long-term maintainability.
          </p>

          {/* Work Approach */}
          <div>
            <h3 className="text-xl sm:text-2xl font-semibold text-white mb-2">
              My Approach
            </h3>
            <ul className="list-disc ml-6 space-y-2 text-gray-300 text-sm sm:text-base md:text-lg">
              <li>Mobile-first design for responsive layouts.</li>
              <li>Accessibility-focused development for all users.</li>
              <li>File-based routing for seamless navigation.</li>
              <li>Dynamic integration of APIs for real-time data.</li>
              <li>RESTful API creation with Node.js and Express.</li>
              <li>Schema Modeling and queries using MongoDB and Moongose.</li>
            </ul>
          </div>

          {/* Future Goals */}
          <div>
            <h3 className="text-xl sm:text-2xl font-semibold text-white mb-2">
              Future Goals
            </h3>
            <p className="text-gray-300 text-sm sm:text-base md:text-lg">
              I&apos;m currently enhancing my skills through the Fullstack
              Bootcamp at the University of Helsinki. While my main focus is on
              web development, I&apos;m also exploring 3D web apps and immersive
              experiences like AR and VR.
            </p>
          </div>

          {/* Call to Action */}
          <div className="flex flex-col sm:flex-row gap-4">
            <LinkButtonPrimary href="/contact">Contact Me</LinkButtonPrimary>
            <a
              className="text-blue-400 hover:text-blue-600 flex items-center gap-2"
              href="/cv-fullstack-rodrigo.pdf"
              download="cv-fullstack-rodrigo.pdf"
            >
              Download CV <span className="text-blue-500 font-semibold">⬇</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
