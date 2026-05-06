"use client";

import { useEffect } from "react";
import { APP_TITLE } from "@/shared/constants/app-title";

/**
 * Sets the browser tab title for the current page.
 * - If `pageTitle` is provided: document.title = "${pageTitle} | ${APP_TITLE}"
 * - If `pageTitle` is empty or not called: title stays as in index.html (APP_TITLE).
 * On unmount, restores the default APP_TITLE so the next page can set its own.
 *
 * Usage in any page or layout:
 *   useDocumentTitle("Dashboard");
 *   useDocumentTitle(); // reset to default
 */
export function useDocumentTitle(pageTitle?: string): void {
  useEffect(() => {
    const previousTitle = document.title;

    if (pageTitle?.trim()) {
      document.title = `${pageTitle.trim()} | ${APP_TITLE}`;
    } else {
      document.title = APP_TITLE;
    }

    return () => {
      document.title = previousTitle;
    };
  }, [pageTitle]);
}
