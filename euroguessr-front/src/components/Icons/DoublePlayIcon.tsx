import React from "react";

interface DoublePlayIconProps {
    isLeft: boolean;
    className?: string;
    fill?: string;
    stroke?: string;
}

export class DoublePlayIcon extends React.Component<DoublePlayIconProps> {
    render(){
        // Props
        const { isLeft, className, fill, stroke } = this.props;

        // Rendered element
        if(isLeft){
            return (
              <svg xmlns="http://www.w3.org/2000/svg" className={className + " w-6 h-6"} fill={fill ? fill : "white"} stroke={stroke ? stroke : "white"} viewBox="0 0 24 24" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061A1.125 1.125 0 0 1 21 8.689v8.122ZM11.25 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061a1.125 1.125 0 0 1 1.683.977v8.122Z" />
              </svg>
            )
        }
        else{
           return (
             <svg xmlns="http://www.w3.org/2000/svg" className={className + " w-6 h-6"} fill={fill ? fill : "white"} stroke={stroke ? stroke : "white"} viewBox="0 0 24 24" strokeWidth="1.5">
               <path strokeLinecap="round" strokeLinejoin="round" d="M3 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061A1.125 1.125 0 0 1 3 16.811V8.69ZM12.75 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061a1.125 1.125 0 0 1-1.683-.977V8.69Z" />
             </svg>
           )
        }
    }
}
