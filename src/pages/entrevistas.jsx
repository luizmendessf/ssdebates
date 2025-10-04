import React from "react";
import './entrevistas.css';

export default function Entrevistas() {
  return (
    <section className="entrevistas-section">
      <h2 className="section-title">Entrevistas</h2>

      <div className="entrevistas-container">
        {/* Entrevista 1 */}
        <div className="entrevista-card">
          <div className="video-container">
            <iframe
              src="https://www.youtube.com/embed/UYNHFLWrOd0"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Entrevista 1"
            ></iframe>
          </div>
          <div className="entrevista-info">
            <h3>Entrevista 1 - Rádio Boca da Mata</h3>
          </div>
        </div>

        {/* Entrevista 2 */}
        <div className="entrevista-card">
          <div className="video-container">
            <iframe
              src="https://www.youtube.com/embed/R0XVPP8_1Aw"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Entrevista 2"
            ></iframe>
          </div>
          <div className="entrevista-info">
            <h3>Entrevista 2 - TV Sergipe</h3>
          </div>
        </div>

        {/* Entrevista 3 */}
        <div className="entrevista-card">
          <div className="video-container">
            <iframe
              src="https://www.youtube.com/embed/XtBumBMkMaw"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Entrevista 3"
            ></iframe>
          </div>
          <div className="entrevista-info">
            <h3>Entrevista 3 - Rádio Liberdade</h3>
          </div>
        </div>

        {/* Entrevista 4 */}
        <div className="entrevista-card">
          <div className="video-container">
            <iframe
              src="https://www.youtube.com/embed/0dvs-S07Ogc"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Entrevista 4"
            ></iframe>
          </div>
          <div className="entrevista-info">
            <h3>Entrevista 4 - TV Alese</h3>
          </div>
        </div>
      </div>
    </section>
  );
}
