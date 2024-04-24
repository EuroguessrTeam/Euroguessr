import React from 'react';
import { Reveal } from 'react-awesome-reveal';
import { fadeUpKeyframes } from '../../utils/animations/fadeUpKeyframes'

export const FadeUp = ({ children, damping }: { children: React.ReactNode, damping: number }) => {
    return (
        <Reveal keyframes={fadeUpKeyframes} cascade triggerOnce damping={damping}> {children} </Reveal>
    )
}