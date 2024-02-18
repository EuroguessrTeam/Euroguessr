
export default function Header() {

    const toggleMenuBar = () => {
      const elements = document.querySelectorAll('.headerMenu');
      for (let i = 0; i < elements.length; i++) {
          elements[i].classList.toggle("translate-y-[25vh]");
      }
    }

    return (
      <>
      {/* Header */}
      <div className="fixed z-50 h-[7.6vh] w-[--header-width] flex items-center bg-yellow overflow-hidden">
        <div className="w-[16.6666%] flex items-center justify-center text-black">
          <button onClick={toggleMenuBar}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" strokeWidth="2.25" stroke="black" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.5h28" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 18h28" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 30.5h28" />
            </svg>
          </button>
        </div>
        <div className="w-[66.6%] flex items-center justify-center">
          <p className="text-[250%] text-bold text-center text-black font-eurotype">Euroguessr *</p>
        </div>
        <div className="w-[16.6666%] h-full flex items-center justify-center">
          <img className="h-[60%] rounded-full" src="src/assets/profile-pic.png"></img>
        </div>
      </div>

      {/* Hidden/Visible Menu */}
      <div className="overflow-hidden z-40 headerMenu fixed top-[-17.4vh] h-[25vh] w-[--header-width] bg-yellow transition ease-in-out duration-700 flex flex-col items-center justify-around	border-t-2 border-black">
        <p className="text-blue font-eurotype text-2xl underline">Menu 1</p>
        <p className="text-blue font-eurotype text-2xl underline">Menu 2</p>
        <p className="text-blue font-eurotype text-2xl underline">Menu 3</p>
        <p className="text-blue font-eurotype text-2xl underline">Menu 4</p>
      </div>

      {/* Yellow triangle */}
      <svg className="z-30 headerMenu fixed top-[7.4vh] h-[3vh] w-[--header-width] fill-yellow transition ease-in-out duration-700" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none" stroke-width="3" stroke="black">
        <polygon points="-5,0 50,100 105,0"/>
      </svg>
    </>
  )
}