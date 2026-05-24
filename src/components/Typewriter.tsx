import { useState, useEffect, useRef } from 'react';

interface TypewriterProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
  onComplete?: () => void;
  cursor?: boolean;
  cursorDone?: boolean;
}

export default function Typewriter({
  text,
  speed = 60,
  delay = 0,
  className,
  style,
  onComplete,
  cursor = true,
  cursorDone = true,
}: TypewriterProps) {
  const [count, setCount] = useState(0);
  const cbRef = useRef(onComplete);
  cbRef.current = onComplete;

  useEffect(() => {
    setCount(0);
    let t: ReturnType<typeof setTimeout>;
    let iv: ReturnType<typeof setInterval>;

    t = setTimeout(() => {
      let i = 0;
      iv = setInterval(() => {
        i += 1;
        setCount(i);
        if (i >= text.length) {
          clearInterval(iv);
          cbRef.current?.();
        }
      }, speed);
    }, delay);

    return () => { clearTimeout(t); clearInterval(iv); };
  }, [text, speed, delay]);

  const done = count >= text.length;

  return (
    <span className={className} style={style}>
      {text.slice(0, count)}
      {cursor && (
        <span
          style={{
            display: 'inline-block',
            width: '0.55em',
            height: '0.8em',
            background: '#5a3410',
            verticalAlign: 'middle',
            marginLeft: '3px',
            animation: done && cursorDone ? 'cursor-blink 1s steps(1) infinite' : 'none',
            opacity: done && cursorDone ? undefined : done ? 0 : 1,
          }}
        />
      )}
    </span>
  );
}
