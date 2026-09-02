"use client";

import { useQuery } from "@tanstack/react-query";

import { getOrganizations } from "@/features/organizations/api/organizations.api";

export function useOrganizations() {
  return useQuery({
    queryKey: ["organizations"],
    queryFn: getOrganizations,
  });
}
