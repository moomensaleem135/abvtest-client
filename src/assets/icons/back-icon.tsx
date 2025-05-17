import * as React from 'react';
import { SVGProps } from 'react';

export const BackIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={6}
    height={11}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="m5 1.5-4 4 4 4"
      stroke="#000"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
