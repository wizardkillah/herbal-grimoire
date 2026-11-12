import { useEffect, useRef, useState } from 'react';
import { exportSave, importSave, MAX_SAVE_BYTES } from './save-file.js';
import { xpOf } from './rules.js';
import './backup.css';

function ImportConfirmation({ pending, currentCount, onCancel, onConfirm, error, returnFocus }) {
  const dialog = useRef(null);
  const cancel = useRef(null);
  useEffect(() => {
    const element = dialog.current;
    element.showModal();cancel.current.focus();
    return () => { element.close();returnFocus.current?.focus(); };
  }, []);
  return <dialog className="gh-import-dialog" ref={dialog} aria-labelledby="import-title" onCancel={event => { event.preventDefault();onCancel(); }}>
    <h2 id="import-title">Revisar respaldo</h2>
    <p>Creado el {new Date(pending.exportedAt).toLocaleString('es-CL')}.</p>
    <p>{pending.state.discoveries.length} recetas · {Object.keys(pending.state.notebook).length} notas · {xpOf(pending.state)} XP.</p>
    <p>{pending.state.nature.harvests} cosechas · {pending.state.nature.finds} hallazgos · jardín y expedición incluidos.</p>
    <p>Se reemplazará la partida actual de {currentCount} recetas por este respaldo. Las partidas no se combinan. Cancela y exporta primero si quieres conservar ambas.</p>
    {error && <p role="alert">{error}</p>}
    <div><button ref={cancel} onClick={onCancel}>Cancelar</button><button onClick={onConfirm}>Reemplazar mi partida</button></div>
  </dialog>;
}

export default function BackupControls({ state, onImport }) {
  const [pending,setPending] = useState(null);
  const [error,setError] = useState('');
  const [message,setMessage] = useState('');
  const [reading,setReading] = useState(false);
  const input = useRef(null);
  const importButton = useRef(null);
  function download() {
    try {
      const url = URL.createObjectURL(new Blob([exportSave(state)],{type:'application/json'}));
      const link = document.createElement('a');
      link.href=url;link.download=`grimorio-respaldo-${new Date().toISOString().replace(/[:.]/g,'-')}.json`;
      document.body.appendChild(link);link.click();link.remove();
      setTimeout(() => URL.revokeObjectURL(url),60000);
      setError('');setMessage('Respaldo preparado. Conserva el archivo descargado para recuperar tu cuaderno.');
    } catch (e) { setError(e.message); }
  }
  async function readFile(event) {
    const file = event.target.files[0];event.target.value='';
    if (!file) return;
    setError('');setMessage('');setReading(true);
    try {
      if (file.size > MAX_SAVE_BYTES) throw new Error('El respaldo supera el límite de 5 MB.');
      setPending(importSave(await file.text()));
    } catch (e) { setError(e.message); }
    finally { setReading(false); }
  }
  function confirm() {
    try {
      onImport(pending.state);setPending(null);setError('');setMessage('Respaldo importado y guardado en este navegador.');
    } catch (e) { setError(e.message); }
  }
  return <section className="gh-backup" aria-label="Respaldo del cuaderno">
    <div><strong>Conserva tu cuaderno</strong><p>Exporta antes de cambiar de navegador o equipo. Guarda las notas que estés editando antes de exportar o imprimir.</p></div>
    <div className="gh-backup-actions">
      <button onClick={download}>Exportar partida</button>
      <button ref={importButton} disabled={reading} onClick={() => input.current.click()}>{reading ? 'Leyendo respaldo…' : 'Importar partida'}</button>
      <button disabled={!state.discoveries.length} onClick={() => window.print()}>Imprimir grimorio</button>
      <input ref={input} type="file" accept=".json,application/json" aria-label="Archivo de respaldo" hidden onChange={readFile} />
    </div>
    {!pending && error && <p role="alert">{error} Tu partida actual se conserva.</p>}
    <p role="status">{message}</p>
    {pending && <ImportConfirmation pending={pending} currentCount={state.discoveries.length} onCancel={() => { setPending(null);setError(''); }} onConfirm={confirm} error={error} returnFocus={importButton} />}
  </section>;
}
