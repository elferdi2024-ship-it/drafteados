import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Tablero de Pronósticos",
  description: "Tus 13 selecciones para la temporada NBA 2026/27.",
  path: "/pickem/picks",
  noIndex: true,
});

export default function PicksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
