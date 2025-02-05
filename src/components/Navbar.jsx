import { useEffect, useState } from "react";

const Navbar = () => {  
  const [theme, setTheme] = useState('light');
  const [position, setPosition] = useState('left-[4px]');
  
  useEffect(() => {
    if (theme === 'dark') {
      document.body.classList.add('dark');
      setPosition('right-[4px]');
    } else {
      document.body.classList.remove('dark');
      setPosition('left-[4px]');
    }
  }, [theme]);
    
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  }

  return (
    <div className="navbar flex md:h-[70px] sm:h-[60px] max-sm:h-[50px] shadow-md items-center">
      <div className="flex justify-between w-full md:mx-16 p-2 md:text-2xl sm:text-xl font-bold select-none">
        <h2>Where in the world?</h2>
        <div className="theme-container">
          <div className="theme w-14 h-7 relative rounded-[2rem] border cursor-pointer" onClick={toggleTheme}>
            <div className={`btn-circle absolute top-[50%] ${position} -translate-y-[50%] flex justify-center items-center w-6 h-6 rounded-full`}>
              {
                theme === 'dark' ? <i className="bi bi-moon-fill text-lg"></i> : <i className="bi bi-brightness-high text-lg"></i>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar