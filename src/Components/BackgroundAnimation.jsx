import React, { useEffect } from 'react';
import anime from 'animejs';

// Import a CSS module or define styles here if using styled-components or inline styles
import './BackgroundAnimation.css';

const BackgroundAnimation = ({ triggerAnimation }) => {

  function randomValues() {
    anime({

      targets: '.square, .circle, .triangle',
      translateX: () => anime.random(-800, 800),
      translateY: () => anime.random(-300, 300),
      rotate: () => anime.random(0, 360),
      scale: () => anime.random(0.5, 2),
      duration: 500,
      easing: 'easeInOutQuad',
      // complete: randomValues,
    });
    
  }
  useEffect(() => {
    anime({
      targets: '.square, .circle, .triangle',
      translateX: () => anime.random(-800, 800),
      translateY: () => anime.random(-300, 300),
      rotate: () => anime.random(0, 360),
      scale: () => anime.random(0.5, 2),
      duration: 600,
      easing: 'easeInOutQuad',
      // complete: triggerAnimation? randomValues : null,
    });
    // console.log(triggerAnimation)
}, [triggerAnimation]); //triggerAnimation

return (
  <div>
    {/* Squares */}
    {[...Array(10)].map((_, i) => <div key={`square-${i}`} className="square" />)}

    {/* Circles */}
    {[...Array(10)].map((_, i) => <div key={`circle-${i}`} className="circle" />)}

    {/* Triangles */}
    {[...Array(10)].map((_, i) => <div key={`triangle-${i}`} className="triangle" />)}
  </div>
);
};

export default BackgroundAnimation;
