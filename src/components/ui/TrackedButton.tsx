"use client";

import type { ComponentProps, MouseEvent } from "react";

import { Button } from "@/components/ui/Button";
import { trackEvent } from "@/lib/analytics";

type TrackedButtonProps = ComponentProps<typeof Button> & {
  /** GA4 event name — letters/digits/underscores, <= 40 chars. */
  event: string;
  eventParams?: Record<string, string | number>;
};

/**
 * `Button` plus a GA4 event on click.
 *
 * A separate component because `Button` and the sections that use it are
 * server components, which cannot receive a function prop. `trackEvent` is
 * fire-and-forget, so the click is never delayed and navigation is unaffected
 * — external hrefs open in a new tab anyway (see `Button`), so the current
 * document is not unloaded and the beacon always gets to leave.
 */
export function TrackedButton({
  event,
  eventParams,
  onClick,
  ...rest
}: TrackedButtonProps) {
  const handleClick = (nativeEvent: MouseEvent<HTMLAnchorElement>) => {
    trackEvent(event, eventParams);
    onClick?.(nativeEvent);
  };

  return <Button {...rest} onClick={handleClick} />;
}
