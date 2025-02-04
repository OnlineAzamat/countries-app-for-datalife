import { useEffect, useState } from "react";

const Navbar = () => {  
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  }

  return (
    <div className="flex md:h-[70px] sm:h-[60px] max-sm:h-[50px] bg-[#2B3944] shadow-md items-center">
      <div className="flex justify-between w-full md:mx-16 p-2 md:text-2xl sm:text-xl font-bold select-none">
        <h2>Where in the world?</h2>
        <div className="theme-container">
          <div className="theme bg-[#11161b] w-14 h-7 relative rounded-[2rem] shadow-md cursor-pointer" onClick={toggleTheme}>
            <div className="btn-circle absolute top-[50%] left-[4px] -translate-y-[50%] w-6 h-6 rounded-full bg-[#485864]"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar