import Search from "../../components/searchbar/Search";
import "./homePage.scss";
function HomePage() {
  return (
    <div className="home">
      <div className="imgContainer">
        <img src="/splashPic.png" alt="" />
      </div>
      <div className="txtContainer">
        <h1>
          Get A dream place for yourself and your family,
          <br />
          Search for your favourite location{" "}
        </h1>
        <p>
          Explore a curated selection of homes, apartments, and commercial
          spaces. Partner with trusted agents and get personalized assistance.
          <br />Start your property search with confidence today!
        </p>
        <Search></Search>
        <div className="boxes">
            <div className="box">
                <h1>16+</h1>
                <h2>Experience</h2>
            </div>
            <div className="box">
                <h1>200</h1>
                <h2>Gained Awards</h2>
            </div>
            <div className="box">
                <h1>1300+</h1>
                <h2>Properties Ready</h2>
            </div>
        </div>
      </div>
    </div>
  );
}
export default HomePage;
