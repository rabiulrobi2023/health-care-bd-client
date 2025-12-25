export const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("".toUpperCase())
    .slice(0, 2);
};

export const formatDateTime = (date: string | Date): string => {
  return new Date(date).toLocaleString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const getQueryString = (
  searchParamsObj: Record<string, string | string[] | undefined>
) => {
  return Object.entries(searchParamsObj)
    .flatMap(([key, value]) => {
      if (Array.isArray(value)) {
        return value.map((v) => `${key}=${encodeURIComponent(v)}`);
      }

      if (value !== undefined) {
        return `${key}=${encodeURIComponent(value)}`;
      }

      return [];
    })
    .join("&");
};
