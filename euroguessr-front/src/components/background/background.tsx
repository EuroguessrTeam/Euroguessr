import React from "react";
import { TriangleLeft, TriangleRight } from "./triangle";

interface BackgroundProps {
    className?: string;
}

interface Part{
    fill: string;
    scale?: string;
}

export class Background extends React.Component<BackgroundProps> {
    render() {
        // Props
        const { className } = this.props;

        const parts: Part[] = [
            {fill: "fill-purple-light"},
            {fill: "fill-yellow", scale: "scale-y-[0.5]"},
            {fill: "fill-yellow-light", scale: "scale-y-[0.2]"},
        ]

        // Rendered element
        return (
            <div className={className}>
                {parts && parts.map((part, index) => {
                    return (
                        <div key={index} className={"absolute inset-0 flex h-screen"}>
                            <TriangleLeft className={` ${part.fill} ${part.scale}`} />
                            <TriangleRight className={`${part.fill} ${part.scale}`} />
                        </div>
                    )
                }) 
                }
            </div>
        )
    }
}
