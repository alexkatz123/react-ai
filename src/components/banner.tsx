"use client";

import {
  Banner,
  BannerClose,
  BannerIcon,
  BannerTitle,
} from "@/components/ui/kibo-ui/banner";
import { CircleAlert } from "lucide-react";
import { CSSProperties } from "react";

export const ExampleBanner = () => {
  return (
    <div
      className="w-full"
      style={
        {
          "--primary": "oklch(0.637 0.237 25.331)",
          "--primary-foreground": "oklch(0.971 0.013 17.38)",
        } as CSSProperties
      }
    >
      <Banner>
        <BannerIcon icon={CircleAlert} />
        <BannerTitle>
          This website is under development. Please do not share any personal
          images.
        </BannerTitle>
        <BannerClose />
      </Banner>
    </div>
  );
};