"use client";

import { useEffect } from "react";

type UseNavigationBlockerOptions = {
  enabled: boolean;
  onBlock: (href: string) => void;
};

export function useNavigationBlocker({ enabled, onBlock }: UseNavigationBlockerOptions) {
  useEffect(() => {
    if (!enabled) {
      return;
    }

    function handleBeforeUnload(event: BeforeUnloadEvent) {
      event.preventDefault();
    }

    function handleDocumentClick(event: MouseEvent) {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const target = event.target;

      if (!(target instanceof Element)) {
        return;
      }

      const link = target.closest<HTMLAnchorElement>("a[href]");

      if (!link || link.target === "_blank" || link.hasAttribute("download")) {
        return;
      }

      const currentUrl = new URL(window.location.href);
      const nextUrl = new URL(link.href, currentUrl);

      if (nextUrl.origin !== currentUrl.origin || nextUrl.href === currentUrl.href) {
        return;
      }

      event.preventDefault();

      onBlock(`${nextUrl.pathname}${nextUrl.search}${nextUrl.hash}`);
    }

    window.addEventListener("beforeunload", handleBeforeUnload);

    document.addEventListener("click", handleDocumentClick, true);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);

      document.removeEventListener("click", handleDocumentClick, true);
    };
  }, [enabled, onBlock]);
}
