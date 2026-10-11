const API_URL = "https://softwares-u80c.onrender.com/format";
const SAMPLE = `{
  name: 'Ada Lovelace',
  "born": 1815,
  tags: ["math", "code",],
  // a comment
  "active": True,
}`;

const $ = (id) => document.getElementById(id);
const input = $("input"), output = $("output"), status = $("status");
const formatBtn = $("format"), copyBtn = $("copy"), downloadBtn = $("download");

function setStatus(msg, kind = "") {
  status.textContent = msg;
  status.className = kind;
}

function setOutput(text) {
  output.value = text;
  copyBtn.disabled = downloadBtn.disabled = !text;
}

async function format() {
  const text = input.value.trim();
  if (!text) return setStatus("Paste some JSON first.", "err");

  formatBtn.disabled = true;
  setStatus("Fixing… (first request may take ~30s while the server wakes up)");
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 90000);
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: text,
      signal: ctrl.signal,
    });
    const body = await res.text();
    if (!res.ok) {
      let msg = body;
      try { msg = JSON.parse(body).message || body; } catch {}
      throw new Error(msg);
    }
    setOutput(body);
    setStatus("Done ✓", "ok");
  } catch (e) {
    setOutput("");
    setStatus(e.name === "AbortError" ? "Request timed out." : `Error: ${e.message}`, "err");
  } finally {
    clearTimeout(timer);
    formatBtn.disabled = false;
  }
}

formatBtn.onclick = format;
$("sample").onclick = () => { input.value = SAMPLE; updateCount(); };
$("clear").onclick = () => { input.value = ""; setOutput(""); setStatus(""); updateCount(); };
copyBtn.onclick = async () => {
  await navigator.clipboard.writeText(output.value);
  setStatus("Copied to clipboard", "ok");
};
downloadBtn.onclick = () => {
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([output.value], { type: "application/json" }));
  a.download = "fixed.json";
  a.click();
  URL.revokeObjectURL(a.href);
};
document.addEventListener("keydown", (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key === "Enter") format();
});

function updateCount() { $("inCount").textContent = input.value ? `${input.value.length} chars` : ""; }
input.addEventListener("input", updateCount);

const root = document.documentElement;
const saved = (() => { try { return localStorage.getItem("theme"); } catch { return null; } })();
if (saved) root.dataset.theme = saved;
$("theme").onclick = () => {
  const next = root.dataset.theme === "light" ? "dark" : "light";
  root.dataset.theme = next;
  try { localStorage.setItem("theme", next); } catch {}
};
