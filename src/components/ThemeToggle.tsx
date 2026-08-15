import { useState, useRef, useCallback, useEffect } from 'react';
import { useTheme } from '../hooks/useTheme';

const TRACK_HEIGHT = 120;
const KNOB_SIZE = 32;
const MAX_OFFSET = TRACK_HEIGHT - KNOB_SIZE; // 88px of travel

// Sun bright: #FCD34D -> rgb(252, 211, 77)
// Moon bright: #6BC5E8 -> rgb(107, 197, 232)

function intensityColor(r: number, g: number, b: number, intensity: number) {
  // Dim floor at 0.3 alpha, bright at 1.0
  const alpha = 0.3 + 0.7 * intensity;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const trackRef = useRef<HTMLDivElement>(null);
  const [knobPosition, setKnobPosition] = useState(1); // 0 = top (sun/light), 1 = bottom (moon/dark)
  const [isDragging, setIsDragging] = useState(false);
  // Ref mirror so the mouseup handler reads the latest position without stale closures
  const knobPositionRef = useRef(1);

  // Initialize / sync position from theme
  useEffect(() => {
    const pos = theme === 'dark' ? 1 : 0;
    setKnobPosition(pos);
    knobPositionRef.current = pos;
  }, [theme]);

  const updateKnobFromClientY = useCallback((clientY: number) => {
    const track = trackRef.current;
    if (!track) return;
    const rect = track.getBoundingClientRect();
    // Knob center travels from (top + KNOB_SIZE/2) to (bottom - KNOB_SIZE/2)
    const minY = rect.top + KNOB_SIZE / 2;
    const maxY = rect.bottom - KNOB_SIZE / 2;
    const range = maxY - minY || 1;
    let ratio = (clientY - minY) / range;
    ratio = Math.max(0, Math.min(1, ratio));
    setKnobPosition(ratio);
    knobPositionRef.current = ratio;
  }, []);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(true);
      updateKnobFromClientY(e.clientY);
    },
    [updateKnobFromClientY],
  );

  // Global drag listeners while dragging
  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      updateKnobFromClientY(e.clientY);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      // Snap to nearest end
      const snapped = knobPositionRef.current < 0.5 ? 0 : 1;
      setKnobPosition(snapped);
      knobPositionRef.current = snapped;
      setTheme(snapped === 0 ? 'light' : 'dark');
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, updateKnobFromClientY, setTheme]);

  // Icon intensity: sun bright at top (pos 0), moon bright at bottom (pos 1)
  const sunIntensity = 1 - knobPosition;
  const moonIntensity = knobPosition;
  const sunColor = intensityColor(252, 211, 77, sunIntensity);
  const moonColor = intensityColor(107, 197, 232, moonIntensity);
  // Color emoji ignore `color`, so also drive opacity for a visible bright/dim effect
  const sunOpacity = 0.35 + 0.65 * sunIntensity;
  const moonOpacity = 0.35 + 0.65 * moonIntensity;

  const knobTop = knobPosition * MAX_OFFSET;

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="flex flex-col items-center gap-2 select-none"
    >
      {/* Sun icon at top */}
      <span
        style={{
          color: sunColor,
          opacity: sunOpacity,
          fontSize: '16px',
          transition: isDragging ? 'none' : 'color 300ms ease, opacity 300ms ease',
        }}
      >
        ☀️
      </span>

      {/* Track with knob */}
      <div
        ref={trackRef}
        className="relative rounded-full"
        style={{
          width: '4px',
          height: `${TRACK_HEIGHT}px`,
          background: 'linear-gradient(to bottom, #FCD34D, #a855f7, #6BC5E8)',
          boxShadow: '0 0 8px rgba(107, 197, 232, 0.4)',
        }}
      >
        <div
          onMouseDown={handleMouseDown}
          className="absolute rounded-full"
          style={{
            width: `${KNOB_SIZE}px`,
            height: `${KNOB_SIZE}px`,
            left: '50%',
            top: `${knobTop}px`,
            transform: 'translateX(-50%)',
            background: 'linear-gradient(135deg, #FCD34D, #a855f7, #6BC5E8)',
            boxShadow:
              '0 0 12px rgba(168, 85, 247, 0.6), 0 0 4px rgba(107, 197, 232, 0.8)',
            transition: isDragging ? 'none' : 'top 300ms ease',
            cursor: isDragging ? 'grabbing' : 'grab',
          }}
        />
      </div>

      {/* Moon icon at bottom */}
      <span
        style={{
          color: moonColor,
          opacity: moonOpacity,
          fontSize: '16px',
          transition: isDragging ? 'none' : 'color 300ms ease, opacity 300ms ease',
        }}
      >
        🌙
      </span>
    </div>
  );
}

export default ThemeToggle;
