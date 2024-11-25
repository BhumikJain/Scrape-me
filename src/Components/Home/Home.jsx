"use client";
import { useEffect, useState, useRef } from "react";
import styles from "./Home.module.css";
import GooeyNavigation from "../Navbar/Navbar";

export default function HomeComponent() {
  const perspective = 1;
  const starColor = "255, 255, 255";
  const speed = 1;
  const starsCount = 1000;

  const [stars, setStars] = useState([]);
  const starsRef = useRef([]);

  const inputRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      initStars();
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const initStars = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const numberOfStars = starsCount;

    const newStars = Array.from({ length: numberOfStars }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      z: Math.random() * width, // Random depth (z-axis)
    }));

    starsRef.current = newStars;
    setStars(newStars);
  };

  const render = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const focalLength = width / perspective;
    const moveSpeed = (speed * width) / 2000;

    // Update the stars' positions based on their z-depth
    starsRef.current = starsRef.current.map((star) => {
      let newStar = { ...star };

      // Move star towards the camera (decrease z value)
      newStar.z -= moveSpeed;

      // Reset star when it goes past the camera (back to farthest distance)
      if (newStar.z <= 0) {
        newStar = {
          x: Math.random() * width,
          y: Math.random() * height,
          z: width,
        };
      }

      return newStar;
    });

    setStars([...starsRef.current]); // Update state to trigger re-render

    requestAnimationFrame(render); // Recursively call render for animation
  };

  useEffect(() => {
    render();
  }, []);

  const handlePaste = async () => {
    try {
      // Read the text from the clipboard
      const clipboardText = await navigator.clipboard.readText();
      // Set the clipboard content as the value of the input field
      if (inputRef.current) {
        inputRef.current.value = clipboardText;
      }
    } catch (error) {
      alert("Failed to read clipboard contents");
    }
  };

  return (
    <main>
      <div className={styles.starContainer}>
        {stars.map((star, index) => {
          const starSize = Math.max(
            0.1,
            (2 * (window.innerWidth / star.z)) / 2
          );

          const starOpacity = 1.2 - star.z / window.innerWidth;

          const starX =
            (star.x - window.innerWidth / 2) * (window.innerWidth / star.z) +
            window.innerWidth / 2;
          const starY =
            (star.y - window.innerHeight / 2) * (window.innerWidth / star.z) +
            window.innerHeight / 2;

          const starStyle = {
            position: "absolute",
            top: `${starY}px`,
            left: `${starX}px`,
            width: `${starSize}px`,
            height: `${starSize}px`,
            backgroundColor: `rgba(${starColor}, ${starOpacity})`,
            borderRadius: "50%",
          };

          return <div key={index} style={starStyle} />;
        })}
      </div>

      <section className={styles.contentContainer}>
        <h1>Scrape Me</h1>
        <div className={styles.inputcontainer}>
          <input
            ref={inputRef}
            type="url"
            name="url"
            id="url"
            placeholder="Paste or type link here"
            autoComplete="off"
          />
          <div className={styles.pasteBoard}>
            <div className={styles.ropes}>
              <hr />
              <hr />
              <div className={styles.paste} onClick={handlePaste}>
                <p>Paste</p>
              </div>
            </div>
          </div>
        </div>
        <GooeyNavigation />
      </section>
    </main>
  );
}
