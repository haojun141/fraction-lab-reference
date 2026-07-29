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
        width={BAR_WIDTH}
        height={BAR_HEIGHT}
        role="img"
        aria-label={label??`${filled} of ${segments} segments`}
        >
            {Array.from({length: segments},(_,i)=>(
         <rect
          key={i}
          x={i * segWidth}
          y={0}
          width={segWidth}
          height={BAR_HEIGHT}
          fill={i < filled ? "#ff6b6b" : "#fff5f0"}
          stroke="#333"
          strokeWidth={2}
          style={interactive ? { cursor: "pointer" } : undefined}
          onClick={interactive ? () => onSegmentClick(i) : undefined}
        />
      ))}
    </svg>
    )
}