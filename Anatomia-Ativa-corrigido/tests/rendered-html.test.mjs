import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { normalizeSearch, scheduleReview } from "../lib/study.ts";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("renderiza a aplicação e os seis destinos principais", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  const html = await response.text();
  assert.match(html, /<title>Anatomia Ativa/);
  for (const label of ["Início", "Explorar", "Atlas", "Quiz", "Revisão", "Progresso"]) {
    assert.match(html, new RegExp(`>${label}<`));
  }
  assert.match(html, /Pular para o conteúdo/);
  assert.match(html, /lang="pt-BR"/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/i);
});

test("busca ignora acentos e encontra português e latim", () => {
  assert.equal(normalizeSearch("Escápula"), "escapula");
  assert.equal(normalizeSearch("  MÚSCULO  "), "musculo");
  assert.ok(normalizeSearch("Escápula Scapula").includes(normalizeSearch("escapula")));
  assert.ok(normalizeSearch("Escápula Scapula").includes(normalizeSearch("SCAPULA")));
});

test("agenda revisões em intervalos válidos e crescentes", () => {
  const now = new Date("2026-07-29T12:00:00.000Z");
  const dates = ["Não lembrei", "Difícil", "Com esforço", "Fácil"].map(rating =>
    new Date(scheduleReview(rating, now)).getTime()
  );
  assert.deepEqual(dates.map(date => Number.isFinite(date)), [true, true, true, true]);
  assert.ok(dates[0] < dates[1] && dates[1] < dates[2] && dates[2] < dates[3]);
  assert.equal(dates[0] - now.getTime(), 10 * 60_000);
  assert.equal(dates[3] - now.getTime(), 7 * 24 * 60 * 60_000);
});

test("PWA possui manifesto e cache offline com atualização segura", async () => {
  const [manifestText, worker, component] = await Promise.all([
    readFile(new URL("../public/manifest.webmanifest", import.meta.url), "utf8"),
    readFile(new URL("../public/sw.js", import.meta.url), "utf8"),
    readFile(new URL("../app/AnatomyApp.tsx", import.meta.url), "utf8"),
  ]);
  const manifest = JSON.parse(manifestText);
  assert.equal(manifest.display, "standalone");
  assert.equal(manifest.start_url, "/");
  assert.ok(manifest.icons.length > 0);
  assert.match(worker, /skipWaiting/);
  assert.match(worker, /clients\.claim/);
  assert.match(worker, /caches\.match/);
  assert.match(component, /localStorage\.setItem\("anatomia-ativa"/);
  assert.match(component, /answerLogs/);
  assert.match(component, /reviewLogs/);
});
