import { useQuery } from "@tanstack/react-query";
import { api } from "../api";

const getOccurrencesSummary = async () => {
  return (await api.get("/occurrences/metrics/summary")).data.result;
};

export const useGetOccurrencesSummary = () =>
  useQuery<{
    last30DaysOccurrencesCount: number;
    last30DaysMainOccurrenceType: string;
    incidentStudentsCount: number;
  }>({
    queryKey: ["occurrencesSummary"],
    queryFn: () => getOccurrencesSummary(),
  });
