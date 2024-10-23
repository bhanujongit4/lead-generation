import Link from 'next/link'

const Navbar = () => {
  return (
    <nav className="bg-black shadow-md py-4">
    <div className="container mx-auto flex justify-between items-center px-4">
      <Link href="/">
        <span className="text-xl text-white">Home</span>
      </Link>
      <ul className="flex flex-col md:flex-row space-x-4 items-center">  <li>
          <Link href="/contact">
            <span className="text-white hover:text-gray-200 px-3 py-2 rounded-md">Contact</span>
          </Link>
        </li>
        <li>
          <Link href="/userpage">
            <span className="text-white hover:text-gray-200 px-3 py-2 rounded-md">Userpage</span>
          </Link>
        </li>
        <button className="md:hidden focus:outline-none text-white hover:text-gray-200 p-2">
          <svg
            className="h-6 w-6"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 6H20M4 12H20M4 18H11V16H4Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </ul>
    </div>
  </nav>
  
  )
}

export default Navbar
