import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

type TextEffectProps = {
  words: string[];
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  typeSpeed?: number;
  backspaceSpeed?: number;
  delay?: number;
  backspaceDelay?: number;
};

const TextEffect: React.FC<TextEffectProps> = ({
  words,
  as = "span",
  className,
  typeSpeed = 100,
  backspaceSpeed = 50,
  delay = 1500,
  backspaceDelay = 500,
}) => {
  const [currentWord, setCurrentWord] = useState(words[0]); // Start with the first word
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);
  const [containerWidth, setContainerWidth] = useState<string>("auto");

  useEffect(() => {
    setIsHydrated(true); // Set hydration status to true once the component has mounted
  }, []);

  useEffect(() => {
    if (!isHydrated) return; // Skip the typing effect until hydration is complete

    const fullWord = words[currentWordIndex];

    const handleTyping = () => {
      if (isDeleting) {
        setCurrentWord((prev) => prev.slice(0, prev.length - 1));
      } else {
        setCurrentWord((prev) => fullWord.slice(0, prev.length + 1));
      }

      if (!isDeleting && currentWord === fullWord) {
        setTimeout(() => setIsDeleting(true), delay);
      } else if (isDeleting && currentWord === "") {
        setIsDeleting(false);
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
      }
    };

    const speed = isDeleting ? backspaceSpeed : typeSpeed;
    const timeout = setTimeout(handleTyping, speed);

    return () => clearTimeout(timeout);
  }, [
    currentWord,
    isDeleting,
    words,
    currentWordIndex,
    typeSpeed,
    backspaceSpeed,
    delay,
    backspaceDelay,
    isHydrated,
  ]);

  useEffect(() => {
    if (containerRef.current) {
      setContainerWidth(`${containerRef.current.scrollWidth}px`);
    }
  }, [currentWord]);

  const MotionTag = motion[as as keyof typeof motion];

  return (
    <MotionTag
      className={className}
      style={{
        display: "inline-block",
        whiteSpace: "nowrap",
        width: containerWidth,
      }}
    >
      <span ref={containerRef} style={{ display: "inline-block" }}>
        <AnimatePresence initial={false}>
          {(isHydrated ? currentWord : words[0])
            .split("")
            .map((char, index) => (
              <motion.span
                key={`${char}-${index}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                style={{ display: "inline-block" }}
              >
                {char}
              </motion.span>
            ))}
        </AnimatePresence>
      </span>
    </MotionTag>
  );
};

export default TextEffect;
