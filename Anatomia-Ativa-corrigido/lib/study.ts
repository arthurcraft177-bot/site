export type ReviewRating = "Não lembrei" | "Difícil" | "Com esforço" | "Fácil";

export function normalizeSearch(value: string): string {
  return value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLocaleLowerCase("pt-BR")
    .trim();
}

export function scheduleReview(rating: ReviewRating, now = new Date()): string {
  const minutes: Record<ReviewRating, number> = {
    "Não lembrei": 10,
    "Difícil": 24 * 60,
    "Com esforço": 3 * 24 * 60,
    "Fácil": 7 * 24 * 60,
  };
  const dueAt = new Date(now.getTime() + minutes[rating] * 60_000);
  if (Number.isNaN(dueAt.getTime())) throw new Error("Data de revisão inválida.");
  return dueAt.toISOString();
}
