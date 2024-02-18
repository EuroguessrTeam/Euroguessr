import React from "react";
import { Triangle } from "./Triangle";

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
            {fill: "fill-yellow", scale: "scale-y-[0.4]"},
            {fill: "fill-yellow-light", scale: "scale-y-[0.15]"},
        ]

        // Rendered element
        return (
            <div className={className}>
                {parts && parts.map((part, index) => {
                    return (
                        <div key={index} className={"absolute inset-0 flex h-screen"}>
                            {[true, false].map((isLeft, index) => {
                                return <Triangle key={index} isLeft={isLeft} className={`${part.fill} ${part.scale}`} />
                            })}
                        </div>
                    )
                })}
            </div>
        )
    }
}
