"use client";
import { Fragment } from "react";

import { HOCLinkProps } from "@/types/links";

import { findText } from "./link-helpers";

import { UrlComponent, urlRegex } from "./url";
import { ProfileComponent, profileRegex } from "./profile";

/**
 * Link URLs
 */
export const LinkUrl: React.FC<HOCLinkProps> = (props) => {
  return (
    <Fragment>
      {findText(
        props.children,
        (match, key) => (
          <UrlComponent key={key} match={match} className={props.className} />
        ),
        urlRegex
      )}
    </Fragment>
  );
};

/**
 * Link Profile handles
 */
export const LinkProfile: React.FC<HOCLinkProps> = (props) => {
  return (
    <Fragment>
      {findText(
        props.children,
        (match, key) => (
          <ProfileComponent
            key={key}
            match={match}
            className={props.className}
          />
        ),
        profileRegex
      )}
    </Fragment>
  );
};
