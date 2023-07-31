import { ReactNode } from "react";

export interface LinkProps {
  /** String that matched the regex */
  match: string;
  /** Key to be used when looping matches */
  key: number;
  /** Optional class which is passed to the linked component */
  className?: string;
}

export interface HOCLinkProps {
  children: ReactNode;
  /** Optional class which is passed to the linked component */
  className?: string;
}

/**
 * Function receives matched string and key to be used for loop, must return a React component
 */
export type Component = (match: string, key: number) => JSX.Element;
