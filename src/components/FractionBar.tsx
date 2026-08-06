interface FractionBarProps{
    segments: number,                           // how many pieces the bar should split into    
    filled: number,                             // how many are filled from the left
    onSegmentClick?: (index: number) => void, 
    label?: string,
}

const BAR_WIDTH = 320;
const BAR_HEIGHT = 64;

export function FractionBar({segments, filled, onSegmentClick, label}: FractionBarProps){
    const segWidth = BAR_WIDTH/ segments;
    const interactive = onSegmentClick !== undefined;
    return (
        <svg
        viewBox={`0 0 ${BAR_WIDTH} ${BAR_HEIGHT}`}
        className="w-full max-w-[320px] h-auto mx-auto"
        role="img"
        aria-label={label??`${filled} of ${segments} segments`}
        >
            {Array.from({length: segments},(_,i)=>(
         <rect
          key={i}
          className="transition-[fill] duration-200 ease-in-out motion-reduce:transition-none"
          x={i * segWidth + 2}
          y={2}
          width={segWidth - 4}
          height={BAR_HEIGHT - 4}
          rx={8}
          ry={8}
          fill={i < filled ? "var(--color-build)" : "var(--color-empty-segment)"}
          stroke="var(--color-ink)"
          strokeWidth={2}
          style={interactive ? { cursor: "pointer" } : undefined}
          onClick={interactive ? () => onSegmentClick(i) : undefined}
        />
      ))}
    </svg>
    )
}