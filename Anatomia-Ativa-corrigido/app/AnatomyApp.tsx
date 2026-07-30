"use client";

import { useEffect, useMemo, useState } from "react";
import { normalizeSearch, scheduleReview, type ReviewRating } from "../lib/study";

type Tab = "inicio" | "explorar" | "atlas" | "quiz" | "revisao" | "progresso";
type Question = { q: string; options: string[]; answer: number; why: string; tag: string };
type AnswerLog = { question: string; correct: boolean; answeredAt: string };
type ReviewLog = { rating: ReviewRating; reviewedAt: string; dueAt: string };

const questions: Question[] = [
  { q: "Qual acidente ósseo da escápula articula-se com a cabeça do úmero?", options: ["Acrômio", "Cavidade glenoidal", "Processo coracoide", "Fossa subescapular"], answer: 1, why: "A cavidade glenoidal é uma superfície articular rasa que recebe a cabeça do úmero na articulação glenoumeral.", tag: "Escápula" },
  { q: "Na posição anatômica, as palmas das mãos estão voltadas para:", options: ["Posterior", "Medial", "Anterior", "Inferior"], answer: 2, why: "Na posição anatômica de referência, o corpo está ereto e as palmas estão voltadas anteriormente.", tag: "Fundamentos" },
  { q: "Qual nervo está particularmente relacionado ao sulco do nervo radial no úmero?", options: ["Nervo mediano", "Nervo radial", "Nervo ulnar", "Nervo axilar"], answer: 1, why: "O nervo radial percorre esse sulco na face posterior do úmero, acompanhado pela artéria braquial profunda.", tag: "Úmero" },
  { q: "O olécrano pertence a qual osso?", options: ["Rádio", "Escápula", "Úmero", "Ulna"], answer: 3, why: "O olécrano é a grande projeção proximal da ulna e forma a ponta palpável do cotovelo.", tag: "Ulna" },
  { q: "Qual é a principal ação do bíceps braquial no antebraço?", options: ["Pronação", "Supinação", "Extensão", "Adução"], answer: 1, why: "O bíceps é um potente supinador, especialmente quando o cotovelo está flexionado; também auxilia na flexão do cotovelo.", tag: "Músculos" },
];

const modules = [
  { icon: "⌖", title: "Fundamentos", subtitle: "Posição, planos e termos", lessons: 5, progress: 72, color: "mint" },
  { icon: "◇", title: "Osteologia", subtitle: "Ossos do membro superior", lessons: 6, progress: 46, color: "blue" },
  { icon: "∞", title: "Articulações", subtitle: "Ombro, cotovelo e punho", lessons: 3, progress: 18, color: "violet" },
  { icon: "⌁", title: "Músculos", subtitle: "Grupos e movimentos", lessons: 4, progress: 8, color: "coral" },
  { icon: "⌇", title: "Neurovascular", subtitle: "Nervos e vasos essenciais", lessons: 2, progress: 0, color: "amber" },
];

const structures = [
  ["Clavícula", "Clavicula", "Osso", "Cintura escapular"],
  ["Escápula", "Scapula", "Osso", "Cintura escapular"],
  ["Úmero", "Humerus", "Osso", "Braço"],
  ["Rádio", "Radius", "Osso", "Antebraço"],
  ["Ulna", "Ulna", "Osso", "Antebraço"],
  ["Bíceps braquial", "Musculus biceps brachii", "Músculo", "Braço"],
  ["Nervo radial", "Nervus radialis", "Nervo", "Membro superior"],
  ["Artéria braquial", "Arteria brachialis", "Vaso", "Braço"],
];

const nav: { id: Tab; label: string; icon: string }[] = [
  { id: "inicio", label: "Início", icon: "⌂" },
  { id: "explorar", label: "Explorar", icon: "⌕" },
  { id: "atlas", label: "Atlas", icon: "◉" },
  { id: "quiz", label: "Quiz", icon: "✦" },
  { id: "revisao", label: "Revisão", icon: "↻" },
  { id: "progresso", label: "Progresso", icon: "↗" },
];

export function AnatomyApp() {
  const [tab, setTab] = useState<Tab>("inicio");
  const [dark, setDark] = useState(false);
  const [query, setQuery] = useState("");
  const [qIndex, setQIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(0);
  const [favorite, setFavorite] = useState<string[]>([]);
  const [answerLogs, setAnswerLogs] = useState<AnswerLog[]>([]);
  const [reviewLogs, setReviewLogs] = useState<ReviewLog[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [labels, setLabels] = useState(true);
  const [hotspot, setHotspot] = useState("Cavidade glenoidal");
  const [notice, setNotice] = useState("");

  useEffect(() => {
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

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem("anatomia-ativa", JSON.stringify({ score, answered, favorite, dark, answerLogs, reviewLogs }));
  }, [score, answered, favorite, dark, answerLogs, reviewLogs, hydrated]);

  useEffect(() => {
    const openSearch = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setTab("explorar");
      }
    };
    window.addEventListener("keydown", openSearch);
    return () => window.removeEventListener("keydown", openSearch);
  }, []);

  const filtered = useMemo(() => structures.filter(s =>
    normalizeSearch(s.join(" ")).includes(normalizeSearch(query))
  ), [query]);

  function answer(i: number) {
    if (selected !== null) return;
    setSelected(i); setAnswered(v => v + 1);
    const correct = i === questions[qIndex].answer;
    if (correct) setScore(v => v + 1);
    setAnswerLogs(logs => [...logs, { question: questions[qIndex].q, correct, answeredAt: new Date().toISOString() }]);
  }

  function nextQuestion() {
    setQIndex(v => (v + 1) % questions.length); setSelected(null);
  }

  function go(id: Tab) { setTab(id); window.scrollTo({ top: 0, behavior: "smooth" }); }

  return (
    <div className={dark ? "app dark" : "app"}>
      <a className="skip" href="#content">Pular para o conteúdo</a>
      <aside className="sidebar">
        <button className="brand" onClick={() => go("inicio")} aria-label="Ir para o início">
          <span className="brandmark">A</span><span>Anatomia<br/><b>Ativa</b></span>
        </button>
        <nav aria-label="Navegação principal">
          {nav.map(n => <button key={n.id} aria-current={tab === n.id ? "page" : undefined} className={tab === n.id ? "nav active" : "nav"} onClick={() => go(n.id)}><span>{n.icon}</span>{n.label}</button>)}
        </nav>
        <div className="side-bottom">
          <button className="nav" onClick={() => setDark(v => !v)}><span>{dark ? "☀" : "◐"}</span>{dark ? "Modo claro" : "Modo escuro"}</button>
          <div className="student"><span className="avatar">EF</span><span><b>Estudante</b><small>Meta: 20 min/dia</small></span></div>
        </div>
      </aside>

      <main id="content">
        <header className="topbar">
          <button className="mobile-brand" onClick={() => go("inicio")}><span className="brandmark">A</span><b>Anatomia Ativa</b></button>
          <button className="searchbar" onClick={() => go("explorar")}><span>⌕</span><span>Buscar estruturas, aulas e termos…</span><kbd>Ctrl K</kbd></button>
          <div className="header-actions"><button onClick={() => setDark(v => !v)} aria-label="Alternar tema">{dark ? "☀" : "◐"}</button><button onClick={() => { setNotice("Você não tem novas notificações."); setTimeout(() => setNotice(""), 3000); }} aria-label="Notificações">♢<i/></button><span className="avatar">EF</span></div>
        </header>

        {tab === "inicio" && <Dashboard go={go} score={score} answered={answered} reviewLogs={reviewLogs} />}
        {tab === "explorar" && <Explore query={query} setQuery={setQuery} filtered={filtered} favorite={favorite} setFavorite={setFavorite} />}
        {tab === "atlas" && <Atlas labels={labels} setLabels={setLabels} hotspot={hotspot} setHotspot={setHotspot} />}
        {tab === "quiz" && <Quiz question={questions[qIndex]} qIndex={qIndex} selected={selected} answer={answer} next={nextQuestion} />}
        {tab === "revisao" && <Review lastReview={reviewLogs.at(-1)} onRate={(rating) => {
          const reviewedAt = new Date().toISOString();
          const dueAt = scheduleReview(rating, new Date(reviewedAt));
          setReviewLogs(logs => [...logs, { rating, reviewedAt, dueAt }]);
          setNotice(`Revisão registrada como “${rating}”. Próxima data: ${new Date(dueAt).toLocaleString("pt-BR")}.`);
          setTimeout(() => setNotice(""), 4500);
        }} />}
        {tab === "progresso" && <Progress score={score} answered={answered} answerLogs={answerLogs} reviewLogs={reviewLogs} />}
      </main>

      <nav className="mobile-nav" aria-label="Navegação móvel">
        {nav.map(n => <button key={n.id} aria-current={tab === n.id ? "page" : undefined} className={tab === n.id ? "active" : ""} onClick={() => go(n.id)}><span>{n.icon}</span><small>{n.label}</small></button>)}
      </nav>
      {notice && <div className="toast" role="status">✓ {notice}</div>}
    </div>
  );
}

function Dashboard({ go, score, answered, reviewLogs }: { go: (t: Tab) => void; score: number; answered: number; reviewLogs: ReviewLog[] }) {
  const accuracy = answered ? Math.round(score / answered * 100) : 0;
  const due = reviewLogs.filter(log => new Date(log.dueAt) <= new Date()).length;
  return <div className="page">
    <section className="welcome">
      <div><p className="eyebrow">QUARTA-FEIRA, 29 DE JULHO</p><h1>Bom dia, estudante <span>✦</span></h1><p>Seu próximo passo está claro. Continue de onde parou ou faça uma revisão rápida.</p></div>
      <div className="streak"><span>♨</span><div><b>7 dias</b><small>de sequência</small></div><em>Recorde: 12</em></div>
    </section>
    <section className="hero-card">
      <div className="hero-copy"><span className="pill">CONTINUAR ESTUDANDO</span><h2>Osteologia do membro superior</h2><p>Você parou em <b>Escápula: acidentes ósseos e orientação</b></p>
        <div className="progress-row"><div className="progress"><i style={{width:"46%"}}/></div><span>46%</span></div>
        <button className="primary" onClick={() => go("atlas")}>Continuar aula <span>→</span></button>
      </div>
      <div className="bone-art" aria-label="Ilustração esquemática de um úmero"><span className="bone-head"/><span className="bone-shaft"/><span className="bone-end"/></div>
    </section>
    <section className="metrics">
      <Metric icon="◎" value={`${due}`} label="Revisões vencidas" note={`${reviewLogs.length} realizadas`} tone="mint"/>
      <Metric icon="✓" value={`${accuracy}%`} label="Taxa de acertos" note="+4% esta semana" tone="blue"/>
      <Metric icon="◷" value="18 min" label="Estudo hoje" note="Meta: 20 min" tone="violet"/>
      <Metric icon="◇" value="12" label="Estruturas dominadas" note="de 60 estudadas" tone="amber"/>
    </section>
    <section className="section-head"><div><p className="eyebrow">TRILHA DE APRENDIZAGEM</p><h2>Seus módulos</h2></div><button className="text-button" onClick={() => go("explorar")}>Ver todos →</button></section>
    <div className="module-grid">{modules.map(m => <article className="module" key={m.title}><span className={`module-icon ${m.color}`}>{m.icon}</span><div><h3>{m.title}</h3><p>{m.subtitle}</p></div><div className="module-meta"><span>{m.lessons} aulas</span><b>{m.progress}%</b></div><div className="progress"><i style={{width:`${m.progress}%`}}/></div></article>)}</div>
    <section className="split">
      <div className="panel"><div className="section-head compact"><div><p className="eyebrow">PARA REVISAR</p><h2>Pontos que merecem atenção</h2></div></div>
        {[["Sulco intertubercular","Úmero","3 erros"],["Movimentos da escápula","Articulações","2 erros"],["Ramos do plexo braquial","Nervos","2 erros"]].map((x,i)=><div className="attention" key={x[0]}><span>{i+1}</span><div><b>{x[0]}</b><small>{x[1]}</small></div><em>{x[2]}</em></div>)}
        <button className="secondary wide" onClick={() => go("revisao")}>Revisar pontos frágeis</button>
      </div>
      <div className="panel daily"><p className="eyebrow">META DIÁRIA</p><div className="goal-ring"><div><b>18</b><small>de 20 min</small></div></div><h3>Quase lá!</h3><p>Mais 2 minutos e você completa sua meta de hoje.</p><button className="primary" onClick={() => go("quiz")}>Praticar agora</button></div>
    </section>
    <footer>Conteúdo educacional. Não substitui materiais oficiais da disciplina ou orientação profissional.</footer>
  </div>
}

function Metric({icon,value,label,note,tone}:{icon:string;value:string;label:string;note:string;tone:string}) {
  return <article className="metric"><span className={`metric-icon ${tone}`}>{icon}</span><div><b>{value}</b><p>{label}</p><small>{note}</small></div></article>
}

function Explore({query,setQuery,filtered,favorite,setFavorite}:{query:string;setQuery:(s:string)=>void;filtered:string[][];favorite:string[];setFavorite:(s:string[])=>void}) {
  const [category, setCategory] = useState("Todos");
  const visible = category === "Todos" ? filtered : filtered.filter(s => s[2] === category.slice(0, -1) || (category === "Vasos" && s[2] === "Vaso"));
  return <div className="page"><div className="page-title"><p className="eyebrow">BIBLIOTECA ANATÔMICA</p><h1>Explorar conteúdos</h1><p>Busque por português, latim, região ou categoria.</p></div>
    <label className="big-search"><span>⌕</span><input autoFocus value={query} onChange={e=>setQuery(e.target.value)} placeholder="Ex.: escápula, scapula, nervo radial…"/></label>
    <div className="chips">{["Todos","Ossos","Músculos","Nervos","Vasos"].map(c => <button key={c} aria-pressed={category===c} className={category===c?"selected":""} onClick={()=>setCategory(c)}>{c}</button>)}</div>
    <div className="structure-list">{visible.map(s => {const fav=favorite.includes(s[0]);return <article className="structure" key={s[0]}><span className="structure-symbol">{s[2]==="Osso"?"◇":s[2]==="Músculo"?"⌁":s[2]==="Nervo"?"⌇":"◉"}</span><div><h3>{s[0]}</h3><i>{s[1]}</i><p>{s[2]} · {s[3]}</p></div><button aria-pressed={fav} className={fav?"star chosen":"star"} onClick={()=>setFavorite(fav?favorite.filter(x=>x!==s[0]):[...favorite,s[0]])} aria-label={`${fav?"Remover":"Adicionar"} ${s[0]} ${fav?"dos":"aos"} favoritos`}>☆</button></article>})}</div>
    {!visible.length && <div className="empty"><b>Nenhuma estrutura encontrada</b><p>Tente outro nome, termo anatômico ou categoria.</p></div>}
  </div>
}

function Atlas({labels,setLabels,hotspot,setHotspot}:{labels:boolean;setLabels:(b:boolean)=>void;hotspot:string;setHotspot:(s:string)=>void}) {
  const spots = [["Acrômio","18%","21%"],["Processo coracoide","35%","29%"],["Cavidade glenoidal","74%","37%"],["Espinha da escápula","45%","48%"],["Ângulo inferior","46%","83%"]];
  return <div className="page"><div className="page-title row-title"><div><p className="eyebrow">ATLAS 2D · MODO DE ESTUDO</p><h1>Escápula — vista posterior</h1></div><button className="secondary" onClick={()=>setLabels(!labels)}>{labels?"Ocultar":"Mostrar"} nomes</button></div>
    <div className="atlas-layout"><div className="atlas-canvas">
      <div className="scapula" aria-label="Diagrama esquemático da escápula"><span className="scapula-spine"/><span className="glenoid"/></div>
      {spots.map(s=><button key={s[0]} aria-pressed={hotspot===s[0]} aria-label={`Selecionar ${s[0]}`} className={hotspot===s[0]?"hotspot active":"hotspot"} style={{left:s[1],top:s[2]}} onClick={()=>setHotspot(s[0])}><i/>{labels&&<span>{s[0]}</span>}</button>)}
      <span className="schematic">DIAGRAMA ESQUEMÁTICO · NÃO ESTÁ EM ESCALA</span>
    </div><aside className="detail-card"><span className="pill">ACIDENTE ÓSSEO</span><h2>{hotspot}</h2><i>Scapula</i><hr/><h3>Como reconhecer?</h3><p>{hotspot==="Cavidade glenoidal"?"Superfície articular oval e rasa na face lateral da escápula. Articula-se com a cabeça do úmero.":"Marco ósseo palpável ou identificável na superfície posterior da escápula."}</p><h3>Relação importante</h3><p>Integra a cintura escapular e participa da orientação anatômica da escápula.</p><div className="clinical"><b>✚ Aplicação clínica</b><p>A identificação correta dos marcos orienta exames físicos e interpretação de imagens.</p></div></aside></div>
  </div>
}

function Quiz({question,qIndex,selected,answer,next}:{question:Question;qIndex:number;selected:number|null;answer:(i:number)=>void;next:()=>void}) {
  const correct=selected===question.answer;
  return <div className="page quiz-page"><div className="quiz-top"><span>QUESTÃO {qIndex+1} DE {questions.length}</span><div className="progress"><i style={{width:`${((qIndex+1)/questions.length)*100}%`}}/></div><span>{question.tag}</span></div>
    <article className="quiz-card"><span className="pill">MÚLTIPLA ESCOLHA · NÍVEL BÁSICO</span><h1>{question.q}</h1><div className="options">{question.options.map((o,i)=><button disabled={selected!==null} key={o} onClick={()=>answer(i)} className={selected===null?"":i===question.answer?"correct":i===selected?"wrong":""}><span>{String.fromCharCode(65+i)}</span>{o}{selected!==null&&i===question.answer&&<b>✓</b>}</button>)}</div>
    {selected!==null&&<div role="status" aria-live="polite" className={correct?"feedback correct-box":"feedback wrong-box"}><h3>{correct?"✓ Muito bem!":"× Ainda não."}</h3><p>{question.why}</p></div>}
    {selected!==null&&<button className="primary next" onClick={next}>Próxima questão →</button>}</article>
  </div>
}

function Review({onRate,lastReview}:{onRate:(s:ReviewRating)=>void;lastReview?:ReviewLog}) {
  return <div className="page review-page"><div className="page-title"><p className="eyebrow">REPETIÇÃO ESPAÇADA</p><h1>Revisão de hoje</h1><p>8 cartões programados · responda antes de revelar.</p></div>
    <article className="flashcard"><span className="pill">OSTEOLOGIA · ESCÁPULA</span><p>QUAL ESTRUTURA É ESTA?</p><h2>Superfície articular rasa, lateral, que recebe a cabeça do úmero.</h2><details><summary>Revelar resposta</summary><div><h3>Cavidade glenoidal</h3><p>Também chamada fossa glenoidal. Sua pouca profundidade favorece mobilidade, enquanto estruturas capsuloligamentares contribuem para a estabilidade.</p></div></details></article>
    <div className="rating"><p>Como foi lembrar?</p><div><button onClick={()=>onRate("Não lembrei")}><b>1</b>Não lembrei<small>10 min</small></button><button onClick={()=>onRate("Difícil")}><b>2</b>Difícil<small>1 dia</small></button><button onClick={()=>onRate("Com esforço")}><b>3</b>Com esforço<small>3 dias</small></button><button onClick={()=>onRate("Fácil")}><b>4</b>Fácil<small>7 dias</small></button></div>{lastReview && <p className="scheduled" role="status">Última revisão: {lastReview.rating}. Próxima em {new Date(lastReview.dueAt).toLocaleString("pt-BR")}.</p>}</div>
  </div>
}

function Progress({score,answered,answerLogs,reviewLogs}:{score:number;answered:number;answerLogs:AnswerLog[];reviewLogs:ReviewLog[]}) {
  const rate=answered?Math.round(score/answered*100):82;
  return <div className="page"><div className="page-title"><p className="eyebrow">SEU APRENDIZADO</p><h1>Progresso</h1><p>Métricas transparentes, baseadas nas suas tentativas e revisões.</p></div>
    <div className="progress-hero"><div className="large-ring" style={{background:`conic-gradient(#8ed4c0 0 ${rate}%,rgba(255,255,255,.2) ${rate}%)`}}><span><b>{rate}%</b><small>acertos</small></span></div><div><h2>{answered ? "Seu desempenho registrado" : "Comece pelo primeiro quiz"}</h2><p>{answered ? `${score} respostas certas e ${answered-score} erradas em ${answered} tentativas.` : "As métricas serão calculadas após suas respostas."}</p><div className="legend"><span><i className="l1"/>Acertos {answerLogs.filter(x=>x.correct).length}</span><span><i className="l3"/>Erros {answerLogs.filter(x=>!x.correct).length}</span><span><i className="l2"/>Revisões {reviewLogs.length}</span></div></div></div>
    <div className="panel"><div className="section-head compact"><div><p className="eyebrow">POR MÓDULO</p><h2>Domínio dos conteúdos</h2></div></div>{modules.map(m=><div className="module-progress" key={m.title}><span>{m.title}</span><div className="progress"><i style={{width:`${m.progress}%`}}/></div><b>{m.progress}%</b></div>)}</div>
  </div>
}
