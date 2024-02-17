import React from "react";

interface TriangleProps {
    className?: string;
}

export class TriangleRight extends React.Component<TriangleProps> {
  render() {
        // Props
        const { className } = this.props;

        // Rendered Element
        return (
            <svg
                className={className}
                width="100%"
                height="100%"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                xmlns="http://www.w3.org/2000/svg">
                    <polygon points="100,100 0,50 100,0" />
            </svg>
        )
  }
}

export class TriangleLeft extends React.Component<TriangleProps> {
  render() {
        // Props
        const { className } = this.props;

        // Rendered Element
        return (
            <svg
                className={className}
                width="100%"
                height="100%"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                xmlns="http://www.w3.org/2000/svg">
                    <polygon points="0,0 100,50 0,100" />
            </svg>
        )
  }
}
