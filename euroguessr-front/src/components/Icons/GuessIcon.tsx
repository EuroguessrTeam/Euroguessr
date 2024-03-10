import React from "react";

interface GuessIconProps {
  className?: string;
  fill?: string;
  stroke?: string;
}

export class GuessIcon extends React.Component<GuessIconProps> {
    render(){
        // Props
        const { className, fill, stroke } = this.props;

        // Rendered element
        return (
            <svg xmlns="http://www.w3.org/2000/svg" className={className + " w-6 h-6 hover:translate-y-[-0.25rem] hover:translate-x-[0.25rem] hover:rotate-minus20 transition-all"} fill={fill ? fill : "white"} viewBox="0 0 24 24" strokeWidth={1.5} stroke={stroke ? stroke :"white"} >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
            </svg>
        )
    }
}
