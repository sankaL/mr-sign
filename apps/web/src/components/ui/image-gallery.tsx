import Link from "next/link";
import { ContentImage } from "@/components/site/content-image";
import type { ServiceDetail } from "@mrsign/content/src/types"; // Assuming this is available, or we can use any

interface ImageGalleryProps {
  services: any[]; // using any[] to avoid strict type imports if not exported perfectly, will use proper types if possible
}

export function ImageGallery({ services }: ImageGalleryProps) {
  // We can chunk the services into groups of 4-6 so they fit well in the accordion rows
  const chunkedServices = [];
  for (let i = 0; i < services.length; i += 4) {
    chunkedServices.push(services.slice(i, i + 4));
  }

  return (
    <div className="flex flex-col items-center justify-start gap-8 w-full">
      {chunkedServices.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className="flex flex-col md:flex-row items-center gap-2 h-[600px] md:h-[400px] lg:h-[500px] w-full"
        >
          {row.map((service, idx) => (
            <Link
              key={service.route}
              href={service.route}
              className="relative group flex-grow transition-all w-full h-24 md:h-full md:w-32 lg:w-40 rounded-[2rem] overflow-hidden duration-500 hover:h-[300px] md:hover:h-full md:hover:w-full border border-[#151515]/10 bg-white"
            >
              <ContentImage
                asset={service.image}
                className="absolute inset-0 h-full w-full"
                imageClassName="h-full w-full object-cover object-center"
                sizes="(min-width: 1024px) 25vw, 100vw"
              />
              <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#E51B23]">
                  {service.categorySlug}
                </p>
                <h2 className="mt-1.5 text-base font-black uppercase leading-none">
                  {service.name}
                </h2>
              </div>
            </Link>
          ))}
        </div>
      ))}
    </div>
  );
}
