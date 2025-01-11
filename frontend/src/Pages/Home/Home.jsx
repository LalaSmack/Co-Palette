import '../../App.css'
import icon from '../../assets/icon.png'
import RoomButton from './RoomButton'

function Home() {
  return (
    <>
      <div className='flex justify-center items-center'>
        <img className="size-14" src={icon} />
        <h1 className="">
        Co-Palette
      </h1>
      </div>
      
      <div className="card">
        {/* <button>
          Start Drawing!
        </button> */} 
        <RoomButton />
      </div>

      <footer className='align-text-bottom p-5' >
        <a href="https://www.freepik.com/icon/painting-palette_8960571#fromView=keyword&page=1&position=8&uuid=f9b96be6-6e82-49a4-9ba3-f79ba78ec481" target='_blank'>Icon by Iconsea</a>
      </footer>
    </>
  )
}

export default Home
