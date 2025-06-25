import '../styles/globals.css'
import Favorites from './Favorites'

function App({ Component, pageProps }) {
  return (
    <>
      <nav className="p-4 bg-gray-100 flex gap-4">
        <a href="/" className="text-primary font-semibold hover:underline">Home</a>
        <a href="/about" className="text-primary font-semibold hover:underline">About</a>
        <a href="/Favorites" className="text-primary font-semibold hover:underline">Favorites</a>
      </nav>
      <Component {...pageProps} />
    </>
  )
}

export default App