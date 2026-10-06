import type { Metadata } from "next";
import PolygonLabeler from "./PolygonLabeler";

const DESCRIPTION =
  "Free online image annotation tool: draw polygons on an image, name each region, and get large text auto-sized to fit inside it. Export as PNG. No upload, no signup.";

export const metadata: Metadata = {
  title: "Polygon Labeler: Label Regions on an Image | jashwanth.fun",
  description: DESCRIPTION,
  keywords: [
    "polygon labeler",
    "image annotation tool",
    "draw polygon on image",
    "label regions on image",
    "add text to polygon",
    "auto-fit text in polygon",
    "region annotation",
    "map zone labeling",
    "online, no upload",
  ],
  alternates: { canonical: "https://jashwanth.fun/tools/polygon-labeler" },
  openGraph: {
    title: "Polygon Labeler: Label Regions on an Image",
    description: DESCRIPTION,
    url: "https://jashwanth.fun/tools/polygon-labeler",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Polygon Labeler",
  url: "https://jashwanth.fun/tools/polygon-labeler",
  description: DESCRIPTION,
  applicationCategory: "MultimediaApplication",
  operatingSystem: "Any (web browser)",
  isAccessibleForFree: true,
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  featureList: [
    "Draw polygons on any image",
    "Name each region with a text label",
    "Label font size auto-fits to the largest size inside the polygon",
    "Per-region fill and text color",
    "Export annotated image as PNG",
    "Runs fully in the browser, images are never uploaded",
  ],
  author: { "@type": "Person", name: "Jashwanth Peddisetty", url: "https://jashwanth.fun" },
};

export default function Page() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-100">
      <main className="mx-auto max-w-5xl px-6 py-10 font-[family-name:var(--font-geist-sans)]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <h1 className="text-3xl font-bold tracking-tight text-white mb-2">
          Polygon Labeler
        </h1>
        <p className="text-zinc-400 mb-6">
          Draw polygons on an image and label each region. The text is
          auto-sized to the largest that fits inside the shape. Export as PNG.
          Runs in your browser, nothing is uploaded.
        </p>
        <PolygonLabeler />
      </main>
    </div>
  );
}
