function TechList() {
  const techItems = [
    { id: 1, title: "Next.js" },
    { id: 2, title: "React" },
    { id: 3, title: "Tailwind" },
    { id: 4, title: "Express" },
    { id: 5, title: "Nodejs" },
  ];

  return (
    <ul className="flex justify-center gap-3 sm:gap-4 bg-stone-800 bg-opacity-50 px-4 py-2 rounded-full">
      {techItems.map((item) => (
        <li
          key={item.id}
          className="text-xs sm:text-sm md:text-base text-white font-medium bg-stone-700 bg-opacity-80 px-2 py-1 rounded-full hover:bg-opacity-100 transition-all duration-300 ease-in-out"
        >
          {item.title}
        </li>
      ))}
    </ul>
  );
}

export default TechList;
