import * as React from 'react';
import { SVGProps } from 'react';

export const ArrowDownIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={14}
    height={8}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="m1 1 6 6 6-6"
      stroke="#000"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
