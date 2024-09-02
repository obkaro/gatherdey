"use client";

import { cn } from "@/lib/utils";
import { motion, useAnimate, useInView } from "framer-motion";
import { useEffect } from "react";

export const TypewriterEffect = ({
  words,
  className,
  cursorClassName,
}: {
  words: {
    text: string;
    className?: string;
  }[];
  className?: string;
  cursorClassName?: string;
}) => {
  // Split text inside of words into an array of characters
  const wordsArray = words.map((word) => {
    return {
      ...word,
      text: word.text.split(""),
    };
  });

  const [scope, animate] = useAnimate();
  const isInView = useInView(scope);

  useEffect(() => {
    if (isInView) {
      const sequence: any[] = [];

      wordsArray.forEach((word, wordIndex) => {
        const wordLength = word.text.length;

        // Typing animation
        word.text.forEach((char, charIndex) => {
          sequence.push({
            target: `#char-${wordIndex}-${charIndex}`,
            opacity: 1,
            display: "inline-block",
            duration: 0.1,
            delay: (wordIndex + charIndex) * 0.1, // Sequential delay
            ease: "easeInOut", // Set easing directly on the animation step
          });
        });

        // Backspacing animation
        word.text.forEach((_, charIndex) => {
          sequence.push({
            target: `#char-${wordIndex}-${wordLength - charIndex - 1}`,
            opacity: 0,
            display: "none",
            duration: 0.1,
            delay: (wordIndex + wordLength + charIndex) * 0.1, // Sequential delay for backspacing
            ease: "easeInOut", // Set easing directly on the animation step
          });
        });
      });

      animate(sequence); // No need for an additional options object here
    }
  }, [isInView]);

  const renderWords = () => {
    return (
      <motion.div ref={scope} className="inline">
        {wordsArray.map((word, wordIndex) => {
          return (
            <div key={`word-${wordIndex}`} className="inline-block">
              {word.text.map((char, charIndex) => (
                <motion.span
                  id={`char-${wordIndex}-${charIndex}`}
                  initial={{ opacity: 0, display: "none" }}
                  key={`char-${charIndex}`}
                  className={cn(`dark:text-white text-black`, word.className)}
                >
                  {char}
                </motion.span>
              ))}
              &nbsp;
            </div>
          );
        })}
      </motion.div>
    );
  };

  return (
    <div
      className={cn(
        "text-base sm:text-xl md:text-3xl lg:text-5xl font-bold text-center",
        className
      )}
    >
      {renderWords()}
      <motion.span
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className={cn(
          "inline-block rounded-sm w-[4px] h-4 md:h-6 lg:h-10 bg-blue-500",
          cursorClassName
        )}
      ></motion.span>
    </div>
  );
};
