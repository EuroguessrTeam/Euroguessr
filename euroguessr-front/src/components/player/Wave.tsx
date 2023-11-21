import React from 'react';
import { Ref } from 'react';
import { useState, useEffect } from 'react';

export const Wave = () => {

    const canvasRef = React.useRef<HTMLCanvasElement>(null);

    return (
        <canvas className='player_wave' ref={canvasRef} />
    );
}