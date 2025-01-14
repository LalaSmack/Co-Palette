import icon from '../assets/icon.png'

export function Navbar() {
  return (
    <nav className="bg-gray-400 ">
      <div className="container mx-auto flex justify-between items-center">
        <div className="p-3 text-2xl font-bold"><img className="size-14" src={icon} /> Co-Palette</div>
        <div className="flex justify-end items-center">
          <a href="/login" className="mr-4">Login</a>
          <a href="/register">Register</a>
        </div>
      </div>
    </nav>
  )
}
