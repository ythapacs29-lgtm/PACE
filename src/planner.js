export function capacity(pulse) {
  return Math.max(0, Math.min(100, Math.round(pulse.energy * 5 + pulse.focus * 5 + (10 - pulse.stress) * 1.5 - 5)));
}
export function pressure(assignments) {
  const active = assignments.filter(a => !a.completed);
  const urgency = active.reduce((s, a) => s + (a.dueInDays <= 0 ? 25 : a.dueInDays <= 2 ? 10 : 2), 0);
  const volume = Math.min(25, active.reduce((s, a) => s + a.estimatedMinutes, 0) / 16);
  const exam = active.some(a => a.type === 'exam' && a.dueInDays <= 2) ? 10 : 0;
  const cluster = active.filter(a => a.dueInDays <= 3).length >= 2 ? 8 : 0;
  const overdue = active.some(a => a.dueInDays < 0) ? 10 : 0;
  return Math.min(100, Math.round(urgency + volume + exam + cluster + overdue));
}
export function makePlan(pulse, assignments) {
  const score = capacity(pulse);
  const block = Math.min(pulse.stress >= 8 ? 25 : 50, score >= 70 ? 40 : score >= 40 ? 25 : 15);
  const plan = [{ id:'reset', title:'A moment to reset', detail:'Clear your head before starting.', minutes:5, kind:'reset', tag:'Start gently', assignmentId:null }];
  const ranked = assignments.filter(a => !a.completed).sort((a,b) => (b.importance * b.estimatedMinutes / (Math.max(0,b.dueInDays)+.5))-(a.importance*a.estimatedMinutes/(Math.max(0,a.dueInDays)+.5)));
  for (const a of ranked) {
    if (a.dueInDays <= 0) {
      let remain=a.estimatedMinutes, part=0;
      while(remain>0){const minutes=Math.min(block,remain);part++;
        plan.push({id:`${a.id}-${part}`,title:a.id==='calc' && block===25 ? `Calculus — Problems ${part===1?'1–4':'5–8'}` : `${a.title} — Part ${part}`, detail:`${a.course} · ${remain===a.estimatedMinutes?'One manageable step at a time.':'Continue where you left off.'}`, minutes, kind:'focus',tag:'Due tonight',assignmentId:a.id});
        remain-=minutes;
        if(remain>0)plan.push({id:`break-${a.id}-${part}`,title:'Take an intentional break',detail:'Step away. Your work will be here.',minutes:score<40?7:5,kind:'reset',tag:'Make room to breathe',assignmentId:null});
      }
    } else if(a.type==='exam') plan.push({id:a.id,title:'Chemistry — Active Recall',detail:'Practice what you remember before checking notes.',minutes:score>=70?35:score>=40?20:10,kind:'learn',tag:'Exam in 2 days',assignmentId:a.id});
    else if(score>=70 && pulse.energy>=6)plan.push({id:a.id,title:a.title,detail:a.course,minutes:Math.min(35,a.estimatedMinutes),kind:'focus',tag:a.dueLabel,assignmentId:a.id});
    else plan.push({id:a.id,title:a.title,detail:'Space for this when you have more capacity.',minutes:0,kind:'deferred',tag:'Moved to tomorrow',assignmentId:a.id});
  }
  return plan;
}
