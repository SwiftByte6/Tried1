import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const CustomCursor = () => {
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  const smoothX = useSpring(cursorX, { stiffness: 300, damping: 20 });
  const smoothY = useSpring(cursorY, { stiffness: 300, damping: 20 });

  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Use motion value for velocity
  const velocity = useMotionValue(0);
  const previousPosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const checkTouchDevice = () => {
      setIsTouchDevice(window.matchMedia("(hover: none)").matches);
    };

    checkTouchDevice();
    window.addEventListener("resize", checkTouchDevice);

    return () => window.removeEventListener("resize", checkTouchDevice);
  }, []);

  useEffect(() => {
    const moveCursor = (e) => {
      const dx = e.clientX - previousPosition.current.x;
      const dy = e.clientY - previousPosition.current.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Update the velocity motion value
      velocity.set(distance);

      previousPosition.current = { x: e.clientX, y: e.clientY };
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, [cursorX, cursorY, velocity]);

  if (isTouchDevice) return null;

  // Use velocity to stretch the cursor when fast
  const scaleX = useTransform(velocity, [0, 100], [1, 1.6]);
  const scaleY = useTransform(velocity, [0, 100], [1, 0.8]);

  return (
    <motion.div
      className="fixed top-0 left-0 w-6 h-6 md:w-7 md:h-7 bg-black rounded-full pointer-events-none z-[9999] mix-blend-difference"
      style={{
        translateX: smoothX,
        translateY: smoothY,
        x: "-50%",
        y: "-50%",
        scaleX,
        scaleY,
      }}
    />
  );
};

export default CustomCursor;
