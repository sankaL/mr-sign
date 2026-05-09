import { permanentRedirect } from "next/navigation";

export default function OrderOnlinePage() {
  permanentRedirect("/request-quote");
}
