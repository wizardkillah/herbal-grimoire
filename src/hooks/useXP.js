// ══════════════════════════════════════════════════════════════════════
//  GRIMORIO HERBAL v8 — Hook useXP
// ══════════════════════════════════════════════════════════════════════
import { useState, useRef, useCallback } from "react";
import { getRank, getNextRank } from "../data/ranks.js";

export function useXP(onLevelUp) {
  const [xp,    setXP]    = useState(() => {
    try { return Number(localStorage.getItem("gh8_xp")) || 0; } catch { return 0; }
  });
  const [newXP, setNewXP] = useState(0);
  const timer = useRef(null);

  const award = useCallback((earned) => {
    setXP(prev => {
      const oldRank = getRank(prev);
      const next    = prev + earned;
      const newRank = getRank(next);
      try { localStorage.setItem("gh8_xp", String(next)); } catch {}
      if (newRank.level > oldRank.level && onLevelUp) {
        setTimeout(() => onLevelUp(newRank), 600);
      }
      return next;
    });
    if (timer.current) clearTimeout(timer.current);
    setNewXP(earned);
    timer.current = setTimeout(() => setNewXP(0), 3500);
  }, [onLevelUp]);

  const rank = getRank(xp);
  const next = getNextRank(rank.level);

  return { xp, rank, next, newXP, award };
}
