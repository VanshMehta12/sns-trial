import React, { useRef, useEffect, PropsWithChildren } from "react";
import { Fancybox as NativeFancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import { OptionsType } from "@fancyapps/ui/types/Fancybox/options";

interface Props {
  options?: Partial<OptionsType>;
  delegate?: string;
}

function Fancybox({ options = {}, delegate = "[data-fancybox]", children }: PropsWithChildren<Props>) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    NativeFancybox.bind(container, delegate, options);

    return () => {
      NativeFancybox.unbind(container);
    };
  }, [options, delegate]); // ✅ Added dependency array to prevent unnecessary re-renders

  return <div ref={containerRef}>{children}</div>;
}

export default Fancybox;
