import React from "react";
import { useGlobalState } from "../../services/useGlobalState";

interface GuessIconProps {
  className?: string;
  fill?: string;
  stroke?: string;
  sendActive?: boolean;
  guessCorrect?: boolean;
}

export class GuessIcon extends React.Component<GuessIconProps> {
    render(){
        // Props
        const { className, fill, stroke, sendActive, guessCorrect } = this.props;

        // Rendered element
        return (
            <svg xmlns="http://www.w3.org/2000/svg" className={`${className} ${!sendActive ? "hover:translate-y-[-0.25rem] hover:translate-x-[0.25rem] hover:rotate-minus20" : ""} w-6 h-6 transition-all`} fill={fill ? fill : "white"} viewBox="0 0 24 24" strokeWidth={1.5} stroke={stroke ? stroke :"white"} >
                <path strokeLinecap="round" strokeLinejoin="round" d={guessCorrect==undefined ? "M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" : guessCorrect ? "m4.5 12.75 6 6 9-13.5" : "M6 18 18 6M6 6l12 12"} />
            </svg>
        )
    }
}
