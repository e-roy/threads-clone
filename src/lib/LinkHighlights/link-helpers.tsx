import { ReactNode, Fragment, isValidElement, cloneElement } from "react";
import { Component } from "@/types/links";

let key = 0;
const getKey = (): number => ++key;

const ctrlCharactersRegex =
  /[\u0000-\u001F\u007F-\u009F\u2000-\u200D\uFEFF]/gim;

/**
 * Make urls clickable.
 * @param text Text to parse
 * @param options {@link Options}
 */
export function linkIt(
  text: string,
  linkComponent: Component,
  linkRegex: RegExp
): ReactNode[] {
  const elements: ReactNode[] = [];
  let rest = text;

  while (true) {
    const match = linkRegex.exec(rest);
    if (!match || match[0] === undefined) break;

    const urlStartIndex = match.index;
    const urlEndIndex = match.index + match[0].length;

    const textBeforeMatch = rest.slice(0, urlStartIndex);
    const url = rest
      .slice(urlStartIndex, urlEndIndex)
      .replace(ctrlCharactersRegex, "");
    rest = rest.slice(urlEndIndex);
    textBeforeMatch && elements.push(textBeforeMatch);
    elements.push(linkComponent(url, getKey()));
  }

  rest && elements.push(<Fragment key={getKey()}>{rest}</Fragment>);

  if (elements.length === 0) {
    return [text];
  }

  return elements;
}

export function findText(
  children: ReactNode,
  component: Component,
  regex: RegExp
): ReactNode {
  if (typeof children === "string") {
    return linkIt(children, component, regex);
  }

  if (Array.isArray(children)) {
    return children.map((c) => findText(c, component, regex));
  }

  if (
    isValidElement(children) &&
    children.props.children &&
    children.type !== "a" &&
    children.type !== "button"
  ) {
    return cloneElement(
      children,
      { ...children.props, key: getKey() },
      findText(children.props.children, component, regex)
    );
  }

  return children;
}
