import Image from "next/image";
import Link from "next/link";
import aboutBackground from "@/public/bg.png"; // Fondo específico para la sección About
import profilePicture from "@/public/about-one.png"; // Imagen de perfil
import { LinkButtonPrimary, LinkButtonSecondary } from "@/components/ui/links";
import TechList from "@/components/hero/techList";

function About() {
  return (
    <section className="relative min-h-[60vh] md:min-h-[75vh] flex items-center justify-center">
      {/* Background Image */}
      <Image
        className="blur-md absolute inset-0 z-0 object-cover"
        fill
        src={aboutBackground}
        alt="Abstract background for the About section"
        quality={30}
      />

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4 flex flex-col gap-6 lg:gap-8">
        {/* Profile Picture */}
        <div className="flex justify-center">
          <Image
            className="w-40 h-40 sm:w-52 sm:h-52 rounded-full border-4 border-white shadow-lg"
            src={profilePicture}
            alt="Profile picture of Rodrigo Arellano"
            width={208}
            height={208}
            quality={30}
          />
        </div>

        {/* Title and Subtitle */}
        <div className="flex flex-col items-center space-y-2">
          <h2 className="uppercase text-lg sm:text-xl md:text-2xl lg:text-5xl font-medium tracking-wide">
            Rodrigo Arellano
          </h2>
          <h1 className="uppercase text-xl sm:text-2xl md:text-4xl lg:text-6xl font-bold tracking-tighter">
            FullStack{" "}
            <span className="bg-gradient-to-r from-orange-50 to-amber-400 bg-clip-text text-transparent">
              Developer
            </span>
          </h1>
        </div>

        {/* Bio */}
        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300">
          I specialize in building high-performance web applications using
          modern technologies like Next.js, Tailwind CSS, and React, as well as
          having solid knowledge with Node.js, Express.js, MongoDB. My focus is
          on creating scalable, accessible, and visually appealing solutions
          tailored to client needs.
        </p>

        {/* Tech List */}
        <div className="flex justify-center">
          <TechList />
        </div>

        {/* Buttons */}
        <div className="flex flex-row flex-wrap items-center justify-center gap-4 lg:gap-6 my-4">
          <LinkButtonSecondary href={"/projects"}>
            View Projects
          </LinkButtonSecondary>
          <LinkButtonPrimary href={"/contact"}>Contact Me</LinkButtonPrimary>
        </div>

        {/* Download CV */}
        <div className="flex justify-center">
          <a
            className="text-blue-400 hover:text-blue-600 flex items-center gap-2"
            href="/cv-fullstack-rodrigo.pdf"
            download="cv-fullstack-rodrigo.pdf"
          >
            Download CV <span className="text-blue-500 font-semibold">⬇</span>
          </a>
        </div>
      </div>
    </section>
  );
}

export default About;
