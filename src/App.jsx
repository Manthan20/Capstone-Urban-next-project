import ListingPage from "./routes/listingPage/listingPage"
import Search from "./components/searchbar/Search"
import "./layout.scss"
import Navbar from "./components/navbar/Navbar"
function App() {
    return (
      <div className="layout">
        <div className="navbar">
        <Navbar/>
        </div>
       <div className="content">
        <ListingPage></ListingPage>
       </div>
      </div>
    )
  }
  
  export default App