import { getRequestConfig } from "next-intl/server";
import { cookies, headers } from "next/headers";

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const headerStore = await headers();

  const cookieLocale = cookieStore.get("NEXT_LOCALE")?.value;

  const acceptLanguage = headerStore.get("accept-language");
  const browserLocale = acceptLanguage?.split(",")[0] || "en";
  const normalizedBrowserLocale = browserLocale.split("-")[0];

  const locale = cookieLocale || normalizedBrowserLocale || "en";

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
