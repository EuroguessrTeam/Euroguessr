interface TriangleProps {
  className?: string;
  isLeft: boolean;
}

export function Triangle ({ className, isLeft }:TriangleProps) {
  // Rendered Element
  return (
      <svg
          className={className}
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg">
              <polygon points={isLeft ? "0,0      100,50  0,100" :
                                        "100,100  0,50    100,0"} />
      </svg>
  )
}
