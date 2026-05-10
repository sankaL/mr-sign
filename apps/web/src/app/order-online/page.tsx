import { permanentRedirect } from "next/navigation";

type OrderOnlinePageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function OrderOnlinePage({
  searchParams,
}: OrderOnlinePageProps) {
  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(await searchParams)) {
    if (Array.isArray(value)) {
      value.forEach((item) => params.append(key, item));
    } else if (value) {
      params.set(key, value);
    }
  }

  const query = params.toString();

  permanentRedirect(query ? `/request-quote?${query}` : "/request-quote");
}
