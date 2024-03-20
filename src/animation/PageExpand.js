export const PageExpandAnimation = {
    initial: {
      opacity: 0,
      y: 50,
      scale: 0.2,
      transition: { duration: 0.1 },
    },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
    },
    exit: {
      opacity: 0,
      scale: 0.2,
      transition: { ease: "easeOut", duration: 0.15 },
    },
  };