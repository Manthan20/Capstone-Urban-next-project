
import "./homePage.scss";

function HomePage() {
  return (
    <div className="homePage">
      <div className="textContainer">
        <div className="wrapper">
          <h1 className="title">Find your dream locality now!</h1>
          <p>
           iure est nulla animi consequatur
            facilis id pariatur fugit quos laudantium temporibus dolor ea
            repellat provident impedit!
          </p>
          {/* <SearchBar /> */}
          <div className="boxes">
            <div className="box">
              <h1>16+</h1>
              <h2>Years of Experience</h2>
            </div>
            <div className="box">
              <h1>200+</h1>
              <h2>Award Gained</h2>
            </div>
            <div className="box">
              <h1>2000+</h1>
              <h2>Property Ready</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="imgContainer">
        <img src="/splashPic.png" alt="splashImage" />
      </div>
    </div>
  );
}

export default HomePage;