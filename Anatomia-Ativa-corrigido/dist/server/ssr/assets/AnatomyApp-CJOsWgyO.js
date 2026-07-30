import { a as require_react, o as __toESM, t as require_jsx_runtime } from "../index.js";
//#region lib/study.ts
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
function normalizeSearch(value) {
	return value.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLocaleLowerCase("pt-BR").trim();
}
function scheduleReview(rating, now = /* @__PURE__ */ new Date()) {
	const dueAt = new Date(now.getTime() + {
		"Não lembrei": 10,
		"Difícil": 1440,
		"Com esforço": 4320,
		"Fácil": 10080
	}[rating] * 6e4);
	if (Number.isNaN(dueAt.getTime())) throw new Error("Data de revisão inválida.");
	return dueAt.toISOString();
}
//#endregion
//#region app/AnatomyApp.tsx
var import_jsx_runtime = require_jsx_runtime();
var questions = [
	{
		q: "Qual acidente ósseo da escápula articula-se com a cabeça do úmero?",
		options: [
			"Acrômio",
			"Cavidade glenoidal",
			"Processo coracoide",
			"Fossa subescapular"
		],
		answer: 1,
		why: "A cavidade glenoidal é uma superfície articular rasa que recebe a cabeça do úmero na articulação glenoumeral.",
		tag: "Escápula"
	},
	{
		q: "Na posição anatômica, as palmas das mãos estão voltadas para:",
		options: [
			"Posterior",
			"Medial",
			"Anterior",
			"Inferior"
		],
		answer: 2,
		why: "Na posição anatômica de referência, o corpo está ereto e as palmas estão voltadas anteriormente.",
		tag: "Fundamentos"
	},
	{
		q: "Qual nervo está particularmente relacionado ao sulco do nervo radial no úmero?",
		options: [
			"Nervo mediano",
			"Nervo radial",
			"Nervo ulnar",
			"Nervo axilar"
		],
		answer: 1,
		why: "O nervo radial percorre esse sulco na face posterior do úmero, acompanhado pela artéria braquial profunda.",
		tag: "Úmero"
	},
	{
		q: "O olécrano pertence a qual osso?",
		options: [
			"Rádio",
			"Escápula",
			"Úmero",
			"Ulna"
		],
		answer: 3,
		why: "O olécrano é a grande projeção proximal da ulna e forma a ponta palpável do cotovelo.",
		tag: "Ulna"
	},
	{
		q: "Qual é a principal ação do bíceps braquial no antebraço?",
		options: [
			"Pronação",
			"Supinação",
			"Extensão",
			"Adução"
		],
		answer: 1,
		why: "O bíceps é um potente supinador, especialmente quando o cotovelo está flexionado; também auxilia na flexão do cotovelo.",
		tag: "Músculos"
	}
];
var modules = [
	{
		icon: "⌖",
		title: "Fundamentos",
		subtitle: "Posição, planos e termos",
		lessons: 5,
		progress: 72,
		color: "mint"
	},
	{
		icon: "◇",
		title: "Osteologia",
		subtitle: "Ossos do membro superior",
		lessons: 6,
		progress: 46,
		color: "blue"
	},
	{
		icon: "∞",
		title: "Articulações",
		subtitle: "Ombro, cotovelo e punho",
		lessons: 3,
		progress: 18,
		color: "violet"
	},
	{
		icon: "⌁",
		title: "Músculos",
		subtitle: "Grupos e movimentos",
		lessons: 4,
		progress: 8,
		color: "coral"
	},
	{
		icon: "⌇",
		title: "Neurovascular",
		subtitle: "Nervos e vasos essenciais",
		lessons: 2,
		progress: 0,
		color: "amber"
	}
];
var structures = [
	[
		"Clavícula",
		"Clavicula",
		"Osso",
		"Cintura escapular"
	],
	[
		"Escápula",
		"Scapula",
		"Osso",
		"Cintura escapular"
	],
	[
		"Úmero",
		"Humerus",
		"Osso",
		"Braço"
	],
	[
		"Rádio",
		"Radius",
		"Osso",
		"Antebraço"
	],
	[
		"Ulna",
		"Ulna",
		"Osso",
		"Antebraço"
	],
	[
		"Bíceps braquial",
		"Musculus biceps brachii",
		"Músculo",
		"Braço"
	],
	[
		"Nervo radial",
		"Nervus radialis",
		"Nervo",
		"Membro superior"
	],
	[
		"Artéria braquial",
		"Arteria brachialis",
		"Vaso",
		"Braço"
	]
];
var nav = [
	{
		id: "inicio",
		label: "Início",
		icon: "⌂"
	},
	{
		id: "explorar",
		label: "Explorar",
		icon: "⌕"
	},
	{
		id: "atlas",
		label: "Atlas",
		icon: "◉"
	},
	{
		id: "quiz",
		label: "Quiz",
		icon: "✦"
	},
	{
		id: "revisao",
		label: "Revisão",
		icon: "↻"
	},
	{
		id: "progresso",
		label: "Progresso",
		icon: "↗"
	}
];
function AnatomyApp() {
	const [tab, setTab] = (0, import_react.useState)("inicio");
	const [dark, setDark] = (0, import_react.useState)(false);
	const [query, setQuery] = (0, import_react.useState)("");
	const [qIndex, setQIndex] = (0, import_react.useState)(0);
	const [selected, setSelected] = (0, import_react.useState)(null);
	const [score, setScore] = (0, import_react.useState)(0);
	const [answered, setAnswered] = (0, import_react.useState)(0);
	const [favorite, setFavorite] = (0, import_react.useState)([]);
	const [answerLogs, setAnswerLogs] = (0, import_react.useState)([]);
	const [reviewLogs, setReviewLogs] = (0, import_react.useState)([]);
	const [hydrated, setHydrated] = (0, import_react.useState)(false);
	const [labels, setLabels] = (0, import_react.useState)(true);
	const [hotspot, setHotspot] = (0, import_react.useState)("Cavidade glenoidal");
	const [notice, setNotice] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		queueMicrotask(() => {
			try {
				const saved = JSON.parse(localStorage.getItem("anatomia-ativa") || "{}");
				setScore(Number.isFinite(saved.score) ? saved.score : 0);
				setAnswered(Number.isFinite(saved.answered) ? saved.answered : 0);
				setFavorite(Array.isArray(saved.favorite) ? saved.favorite : []);
				setAnswerLogs(Array.isArray(saved.answerLogs) ? saved.answerLogs : []);
				setReviewLogs(Array.isArray(saved.reviewLogs) ? saved.reviewLogs : []);
				setDark(saved.dark === true);
			} catch {
				localStorage.removeItem("anatomia-ativa");
			} finally {
				setHydrated(true);
			}
		});
		if ("serviceWorker" in navigator) navigator.serviceWorker.register("/sw.js").catch(() => {});
	}, []);
	(0, import_react.useEffect)(() => {
		if (!hydrated) return;
		localStorage.setItem("anatomia-ativa", JSON.stringify({
			score,
			answered,
			favorite,
			dark,
			answerLogs,
			reviewLogs
		}));
	}, [
		score,
		answered,
		favorite,
		dark,
		answerLogs,
		reviewLogs,
		hydrated
	]);
	(0, import_react.useEffect)(() => {
		const openSearch = (event) => {
			if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
				event.preventDefault();
				setTab("explorar");
			}
		};
		window.addEventListener("keydown", openSearch);
		return () => window.removeEventListener("keydown", openSearch);
	}, []);
	const filtered = (0, import_react.useMemo)(() => structures.filter((s) => normalizeSearch(s.join(" ")).includes(normalizeSearch(query))), [query]);
	function answer(i) {
		if (selected !== null) return;
		setSelected(i);
		setAnswered((v) => v + 1);
		const correct = i === questions[qIndex].answer;
		if (correct) setScore((v) => v + 1);
		setAnswerLogs((logs) => [...logs, {
			question: questions[qIndex].q,
			correct,
			answeredAt: (/* @__PURE__ */ new Date()).toISOString()
		}]);
	}
	function nextQuestion() {
		setQIndex((v) => (v + 1) % questions.length);
		setSelected(null);
	}
	function go(id) {
		setTab(id);
		window.scrollTo({
			top: 0,
			behavior: "smooth"
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: dark ? "app dark" : "app",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				className: "skip",
				href: "#content",
				children: "Pular para o conteúdo"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "sidebar",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "brand",
						onClick: () => go("inicio"),
						"aria-label": "Ir para o início",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "brandmark",
							children: "A"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							"Anatomia",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Ativa" })
						] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						"aria-label": "Navegação principal",
						children: nav.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							"aria-current": tab === n.id ? "page" : void 0,
							className: tab === n.id ? "nav active" : "nav",
							onClick: () => go(n.id),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: n.icon }), n.label]
						}, n.id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "side-bottom",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "nav",
							onClick: () => setDark((v) => !v),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: dark ? "☀" : "◐" }), dark ? "Modo claro" : "Modo escuro"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "student",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "avatar",
								children: "EF"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Estudante" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Meta: 20 min/dia" })] })]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				id: "content",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
						className: "topbar",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								className: "mobile-brand",
								onClick: () => go("inicio"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "brandmark",
									children: "A"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Anatomia Ativa" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								className: "searchbar",
								onClick: () => go("explorar"),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "⌕" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Buscar estruturas, aulas e termos…" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("kbd", { children: "Ctrl K" })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "header-actions",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => setDark((v) => !v),
										"aria-label": "Alternar tema",
										children: dark ? "☀" : "◐"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: () => {
											setNotice("Você não tem novas notificações.");
											setTimeout(() => setNotice(""), 3e3);
										},
										"aria-label": "Notificações",
										children: ["♢", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "avatar",
										children: "EF"
									})
								]
							})
						]
					}),
					tab === "inicio" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dashboard, {
						go,
						score,
						answered,
						reviewLogs
					}),
					tab === "explorar" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Explore, {
						query,
						setQuery,
						filtered,
						favorite,
						setFavorite
					}),
					tab === "atlas" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Atlas, {
						labels,
						setLabels,
						hotspot,
						setHotspot
					}),
					tab === "quiz" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Quiz, {
						question: questions[qIndex],
						qIndex,
						selected,
						answer,
						next: nextQuestion
					}),
					tab === "revisao" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Review, {
						lastReview: reviewLogs.at(-1),
						onRate: (rating) => {
							const reviewedAt = (/* @__PURE__ */ new Date()).toISOString();
							const dueAt = scheduleReview(rating, new Date(reviewedAt));
							setReviewLogs((logs) => [...logs, {
								rating,
								reviewedAt,
								dueAt
							}]);
							setNotice(`Revisão registrada como “${rating}”. Próxima data: ${new Date(dueAt).toLocaleString("pt-BR")}.`);
							setTimeout(() => setNotice(""), 4500);
						}
					}),
					tab === "progresso" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
						score,
						answered,
						answerLogs,
						reviewLogs
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "mobile-nav",
				"aria-label": "Navegação móvel",
				children: nav.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					"aria-current": tab === n.id ? "page" : void 0,
					className: tab === n.id ? "active" : "",
					onClick: () => go(n.id),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: n.icon }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: n.label })]
				}, n.id))
			}),
			notice && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "toast",
				role: "status",
				children: ["✓ ", notice]
			})
		]
	});
}
function Dashboard({ go, score, answered, reviewLogs }) {
	const accuracy = answered ? Math.round(score / answered * 100) : 0;
	const due = reviewLogs.filter((log) => new Date(log.dueAt) <= /* @__PURE__ */ new Date()).length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "page",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "welcome",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "eyebrow",
						children: "QUARTA-FEIRA, 29 DE JULHO"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", { children: ["Bom dia, estudante ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "✦" })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Seu próximo passo está claro. Continue de onde parou ou faça uma revisão rápida." })
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "streak",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "♨" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "7 dias" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "de sequência" })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "Recorde: 12" })
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "hero-card",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "hero-copy",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "pill",
							children: "CONTINUAR ESTUDANDO"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Osteologia do membro superior" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: ["Você parou em ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Escápula: acidentes ósseos e orientação" })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "progress-row",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "progress",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { style: { width: "46%" } })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "46%" })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "primary",
							onClick: () => go("atlas"),
							children: ["Continuar aula ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "→" })]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bone-art",
					"aria-label": "Ilustração esquemática de um úmero",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "bone-head" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "bone-shaft" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "bone-end" })
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "metrics",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
						icon: "◎",
						value: `${due}`,
						label: "Revisões vencidas",
						note: `${reviewLogs.length} realizadas`,
						tone: "mint"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
						icon: "✓",
						value: `${accuracy}%`,
						label: "Taxa de acertos",
						note: "+4% esta semana",
						tone: "blue"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
						icon: "◷",
						value: "18 min",
						label: "Estudo hoje",
						note: "Meta: 20 min",
						tone: "violet"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
						icon: "◇",
						value: "12",
						label: "Estruturas dominadas",
						note: "de 60 estudadas",
						tone: "amber"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "section-head",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "eyebrow",
					children: "TRILHA DE APRENDIZAGEM"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Seus módulos" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "text-button",
					onClick: () => go("explorar"),
					children: "Ver todos →"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "module-grid",
				children: modules.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "module",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: `module-icon ${m.color}`,
							children: m.icon
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: m.title }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: m.subtitle })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "module-meta",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [m.lessons, " aulas"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: [m.progress, "%"] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "progress",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { style: { width: `${m.progress}%` } })
						})
					]
				}, m.title))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "split",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "panel",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "section-head compact",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "eyebrow",
								children: "PARA REVISAR"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Pontos que merecem atenção" })] })
						}),
						[
							[
								"Sulco intertubercular",
								"Úmero",
								"3 erros"
							],
							[
								"Movimentos da escápula",
								"Articulações",
								"2 erros"
							],
							[
								"Ramos do plexo braquial",
								"Nervos",
								"2 erros"
							]
						].map((x, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "attention",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: i + 1 }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: x[0] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: x[1] })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: x[2] })
							]
						}, x[0])),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "secondary wide",
							onClick: () => go("revisao"),
							children: "Revisar pontos frágeis"
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "panel daily",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "eyebrow",
							children: "META DIÁRIA"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "goal-ring",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "18" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "de 20 min" })] })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Quase lá!" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Mais 2 minutos e você completa sua meta de hoje." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "primary",
							onClick: () => go("quiz"),
							children: "Praticar agora"
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", { children: "Conteúdo educacional. Não substitui materiais oficiais da disciplina ou orientação profissional." })
		]
	});
}
function Metric({ icon, value, label, note, tone }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "metric",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: `metric-icon ${tone}`,
			children: icon
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: value }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: label }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: note })
		] })]
	});
}
function Explore({ query, setQuery, filtered, favorite, setFavorite }) {
	const [category, setCategory] = (0, import_react.useState)("Todos");
	const visible = category === "Todos" ? filtered : filtered.filter((s) => s[2] === category.slice(0, -1) || category === "Vasos" && s[2] === "Vaso");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "page",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "page-title",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "eyebrow",
						children: "BIBLIOTECA ANATÔMICA"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "Explorar conteúdos" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Busque por português, latim, região ou categoria." })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "big-search",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "⌕" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					autoFocus: true,
					value: query,
					onChange: (e) => setQuery(e.target.value),
					placeholder: "Ex.: escápula, scapula, nervo radial…"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "chips",
				children: [
					"Todos",
					"Ossos",
					"Músculos",
					"Nervos",
					"Vasos"
				].map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					"aria-pressed": category === c,
					className: category === c ? "selected" : "",
					onClick: () => setCategory(c),
					children: c
				}, c))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "structure-list",
				children: visible.map((s) => {
					const fav = favorite.includes(s[0]);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "structure",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "structure-symbol",
								children: s[2] === "Osso" ? "◇" : s[2] === "Músculo" ? "⌁" : s[2] === "Nervo" ? "⌇" : "◉"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: s[0] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { children: s[1] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
									s[2],
									" · ",
									s[3]
								] })
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								"aria-pressed": fav,
								className: fav ? "star chosen" : "star",
								onClick: () => setFavorite(fav ? favorite.filter((x) => x !== s[0]) : [...favorite, s[0]]),
								"aria-label": `${fav ? "Remover" : "Adicionar"} ${s[0]} ${fav ? "dos" : "aos"} favoritos`,
								children: "☆"
							})
						]
					}, s[0]);
				})
			}),
			!visible.length && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "empty",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Nenhuma estrutura encontrada" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Tente outro nome, termo anatômico ou categoria." })]
			})
		]
	});
}
function Atlas({ labels, setLabels, hotspot, setHotspot }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "page",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "page-title row-title",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "eyebrow",
				children: "ATLAS 2D · MODO DE ESTUDO"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "Escápula — vista posterior" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				className: "secondary",
				onClick: () => setLabels(!labels),
				children: [labels ? "Ocultar" : "Mostrar", " nomes"]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "atlas-layout",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "atlas-canvas",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "scapula",
						"aria-label": "Diagrama esquemático da escápula",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "scapula-spine" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "glenoid" })]
					}),
					[
						[
							"Acrômio",
							"18%",
							"21%"
						],
						[
							"Processo coracoide",
							"35%",
							"29%"
						],
						[
							"Cavidade glenoidal",
							"74%",
							"37%"
						],
						[
							"Espinha da escápula",
							"45%",
							"48%"
						],
						[
							"Ângulo inferior",
							"46%",
							"83%"
						]
					].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						"aria-pressed": hotspot === s[0],
						"aria-label": `Selecionar ${s[0]}`,
						className: hotspot === s[0] ? "hotspot active" : "hotspot",
						style: {
							left: s[1],
							top: s[2]
						},
						onClick: () => setHotspot(s[0]),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}), labels && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: s[0] })]
					}, s[0])),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "schematic",
						children: "DIAGRAMA ESQUEMÁTICO · NÃO ESTÁ EM ESCALA"
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "detail-card",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "pill",
						children: "ACIDENTE ÓSSEO"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: hotspot }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { children: "Scapula" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("hr", {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Como reconhecer?" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: hotspot === "Cavidade glenoidal" ? "Superfície articular oval e rasa na face lateral da escápula. Articula-se com a cabeça do úmero." : "Marco ósseo palpável ou identificável na superfície posterior da escápula." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Relação importante" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Integra a cintura escapular e participa da orientação anatômica da escápula." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "clinical",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "✚ Aplicação clínica" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "A identificação correta dos marcos orienta exames físicos e interpretação de imagens." })]
					})
				]
			})]
		})]
	});
}
function Quiz({ question, qIndex, selected, answer, next }) {
	const correct = selected === question.answer;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "page quiz-page",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "quiz-top",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
					"QUESTÃO ",
					qIndex + 1,
					" DE ",
					questions.length
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "progress",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { style: { width: `${(qIndex + 1) / questions.length * 100}%` } })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: question.tag })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
			className: "quiz-card",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "pill",
					children: "MÚLTIPLA ESCOLHA · NÍVEL BÁSICO"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: question.q }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "options",
					children: question.options.map((o, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						disabled: selected !== null,
						onClick: () => answer(i),
						className: selected === null ? "" : i === question.answer ? "correct" : i === selected ? "wrong" : "",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: String.fromCharCode(65 + i) }),
							o,
							selected !== null && i === question.answer && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "✓" })
						]
					}, o))
				}),
				selected !== null && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					role: "status",
					"aria-live": "polite",
					className: correct ? "feedback correct-box" : "feedback wrong-box",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: correct ? "✓ Muito bem!" : "× Ainda não." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: question.why })]
				}),
				selected !== null && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "primary next",
					onClick: next,
					children: "Próxima questão →"
				})
			]
		})]
	});
}
function Review({ onRate, lastReview }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "page review-page",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "page-title",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "eyebrow",
						children: "REPETIÇÃO ESPAÇADA"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "Revisão de hoje" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "8 cartões programados · responda antes de revelar." })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "flashcard",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "pill",
						children: "OSTEOLOGIA · ESCÁPULA"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "QUAL ESTRUTURA É ESTA?" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Superfície articular rasa, lateral, que recebe a cabeça do úmero." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", { children: "Revelar resposta" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Cavidade glenoidal" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Também chamada fossa glenoidal. Sua pouca profundidade favorece mobilidade, enquanto estruturas capsuloligamentares contribuem para a estabilidade." })] })] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rating",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Como foi lembrar?" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => onRate("Não lembrei"),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "1" }),
								"Não lembrei",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "10 min" })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => onRate("Difícil"),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "2" }),
								"Difícil",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "1 dia" })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => onRate("Com esforço"),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "3" }),
								"Com esforço",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "3 dias" })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => onRate("Fácil"),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "4" }),
								"Fácil",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "7 dias" })
							]
						})
					] }),
					lastReview && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "scheduled",
						role: "status",
						children: [
							"Última revisão: ",
							lastReview.rating,
							". Próxima em ",
							new Date(lastReview.dueAt).toLocaleString("pt-BR"),
							"."
						]
					})
				]
			})
		]
	});
}
function Progress({ score, answered, answerLogs, reviewLogs }) {
	const rate = answered ? Math.round(score / answered * 100) : 82;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "page",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "page-title",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "eyebrow",
						children: "SEU APRENDIZADO"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "Progresso" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Métricas transparentes, baseadas nas suas tentativas e revisões." })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "progress-hero",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "large-ring",
					style: { background: `conic-gradient(#8ed4c0 0 ${rate}%,rgba(255,255,255,.2) ${rate}%)` },
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: [rate, "%"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "acertos" })] })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: answered ? "Seu desempenho registrado" : "Comece pelo primeiro quiz" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: answered ? `${score} respostas certas e ${answered - score} erradas em ${answered} tentativas.` : "As métricas serão calculadas após suas respostas." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "legend",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: "l1" }),
								"Acertos ",
								answerLogs.filter((x) => x.correct).length
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: "l3" }),
								"Erros ",
								answerLogs.filter((x) => !x.correct).length
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: "l2" }),
								"Revisões ",
								reviewLogs.length
							] })
						]
					})
				] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "panel",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "section-head compact",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "eyebrow",
						children: "POR MÓDULO"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Domínio dos conteúdos" })] })
				}), modules.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "module-progress",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: m.title }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "progress",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { style: { width: `${m.progress}%` } })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: [m.progress, "%"] })
					]
				}, m.title))]
			})
		]
	});
}
//#endregion
export { AnatomyApp };
