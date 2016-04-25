import React from "react";
import { renderIntoDocument } from "react-addons-test-utils";
import { findDOMNode } from "react-dom";


export function createComponent(Component, props) {
  const comp = renderIntoDocument(<Component {...props} />);
  const queryAll = (selector) => findDOMNode(comp).querySelectorAll(selector);
  const query = (selector) => {
    const element = findDOMNode(comp);
    return selector ? element.querySelector(selector) : element;
  };
  return {...comp, query, queryAll};
}

export function d(node) {
  console.log(require("html").prettyPrint(node.outerHTML, {indent_size: 2}));
}
