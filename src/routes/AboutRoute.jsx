import './AboutRoute.css';

export default function AboutRoute() {
  return (
    <div className="about__container">
      <div className="about__content">
        <div className="about__header">
          <h1 className="about__title">About This Project</h1>
          <div className="about__divider"></div>
        </div>
        
        <div className="about__section">
          <h2 className="about__section__title">Why I Built This</h2>
          <p className="about__text">
          The idea bloomed while watching my brother and sister search for their first homes. Each time they found 
          a place that matched their budget, the size wasn't right. When the size worked, the location didn't. It 
          felt like an endless trade-off, and I found myself wondering beyond finding a home – where the best 
          investment might be made. 
          </p>
          <br />
          <p className="about__text">
          As a creative person with a passion for web development and real estate, what started as curiosity about 
          property data became an exciting project to visualize and understand London's property market. 
          I decided to transform this raw data into an interactive, user-friendly map displaying property prices 
          across London. This is my attempt to bring the numbers to life and make the city’s property market a little more 
          understandable.

          </p>
        </div>

        <div className="about__section">
          <h2 className="about__section__title">The Technology</h2>
          <p className="about__text">
          This project brings together modern web development practices with a focus on clarity and interactivity. 
          The frontend uses React and Leaflet for dynamic mapping, while the backend is powered by Express and 
          PostgreSQL. Later in the process, I also used Cursor, an AI coding assistant, to refine and speed up 
          development.
          </p>
        </div>

        <div className="about__section">
          <h2 className="about__section__title">The Vision</h2>
          <p className="about__text">
          My goal is to make property data more accessible and understandable. I've started with 2023 data but 
          intend to extend this to all available historic data, and then I'll take this further with AI features. 
          By presenting complex information in an intuitive visual format, I hope to help people better understand 
          London real estate and make more informed decisions. 
          </p>
          <br />
          <p className="about__text">
          I'm also open to feature suggestions!
          </p>
        </div>
      </div>
    </div>
  );
}
