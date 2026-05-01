import useSWR from "swr";

const fetcher = (url: string) =>
  fetch(url).then((res) => {
    if (!res.ok) throw new Error("Failed");
    return res.json();
  });

export const useExpenses = (filters: any) => {
  const params = new URLSearchParams();

  if (filters.category) params.append("category", filters.category);
  if (filters.date) params.append("date", filters.date);
  if (filters.sort) params.append("sort", filters.sort);

  const query = `/api/expenses?${params.toString()}`;

  const { data, error, isLoading, mutate } = useSWR(query, fetcher);
  console.log(data)
  return {
    expenses: data || [],
    isLoading,
    isError: error,
    mutate,
  };
};