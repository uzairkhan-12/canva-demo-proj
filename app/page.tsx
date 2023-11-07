'use client'
import dynamic from "next/dynamic";

const NoSSRComponent = dynamic(() => import("@/components/MyCanva"), {
  ssr: false,
});
const ImageDownloading = dynamic(() => import("@/components/ImageDownloading"), {
  ssr: false,
});

export default function TestsPage(props: any) {
  return (
  <div>
    <NoSSRComponent />
    {/* <ImageDownloading /> */}
    </div>
  )
}