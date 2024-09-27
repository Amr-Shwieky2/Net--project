// eslint-disable-next-line no-unused-vars
import React from 'react';
import "./style/About.css"; // Assuming you have a separate CSS file for the About page

const About = () => {
  return (
    <div className="about-container">
      <div className="about-hero">
        <h1>برنامج نيتع@</h1>
      </div>

      <div className="about-content">
        <section className="about-section">
          <p>
            نيتع@ هي منظمة شبابية تكنولوجية، تابعة لجمعية التفاح (Appleseeds). تم الاعتراف بها من قبل وزارة التربية والتعليم، وتأسست في عام 2003. 
            هدف المنظمة هو خلق المساواة التكنولوجية بين الشباب.
          </p>
        </section>

        <section className="about-section">
          <p>
            كلمة نيطع@ مأخوذة من كلمة Net@ في اللغة الإنجليزية.
          </p>
        </section>
      </div>

      <div className="about-footer">
        <p>עמותת תפוח | جمعية التفاح Appleseeds</p>
      </div>
    </div>
  );
};

export default About;
