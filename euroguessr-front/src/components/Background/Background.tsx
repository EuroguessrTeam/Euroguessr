import { Triangle } from "./Triangle";

interface BackgroundProps {
  className?: string;
}

interface Part{
  fill: string;
  scale?: string;
  strokeWidth?: string; 
  stroke?: string;
}

export function Background ({ className }:BackgroundProps) {
  const parts: Part[] = [
      {fill: "fill-purple-light"},
      {fill: "fill-yellow", scale: "scale-y-[0.325]"},
      {fill: "fill-yellow-light", scale: "scale-y-[0.13]", strokeWidth:"stroke-2", stroke:"stroke-white"},
  ]
  
  // Rendered element
  return ( 
    <div className={className}>
        {parts && parts.map((part, index) => {
            return (
                <div key={index} className={"absolute inset-0 flex h-screen"}>
                    {[true, false].map((isLeft, index) => {
                        return <Triangle key={index} isLeft={isLeft} className={`${part.fill} ${part.scale} ${part.strokeWidth} ${part.stroke}`} />
                    })}
                </div>
            )
        })}
    </div>
  )
}
