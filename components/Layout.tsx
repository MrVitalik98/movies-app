import Image from 'next/image'
import { FC, ReactNode } from 'react'
import Navbar from './Navbar'
import ScrollButton from './ScrollButton'


interface IProps {
  children: ReactNode
}


const Layout:FC<IProps> = ({ children }) => {
  return (
    <div className="app">
      <header>
        <Navbar />
      </header>

      <main>
        {/* <Toast /> */}
        
        {children}

        <ScrollButton />
      </main>

      <footer>
        <Image 
          width={50}
          height={50}
          className="tmdb"
          src="/themoviedb.svg" 
          alt="tmdb" 
        />
        
        <p>©2021</p>
      </footer>
    </div>
  )
}


export default Layout