// src/components/sections/SkillsTimelineSection/SkillsDetailPanel.tsx
import React from 'react';
import { CATEGORIES, SKILLS } from '../../../data/skills-data';

interface SkillsDetailPanelProps {
  skillId: string;
  locale?: string;
}

const LEVEL_COLORS: Record<string, string> = {
  advanced:   'bg-violet-100 text-violet-700',
  proficient: 'bg-blue-100 text-blue-700',
  familiar:   'bg-neutral-100 text-neutral-600',
};

const MIN_YEAR = 2019;
const MAX_YEAR = 2026;
const TOTAL_YEARS = MAX_YEAR - MIN_YEAR + 1;

export default function SkillsDetailPanel({ skillId, locale = 'pt' }: SkillsDetailPanelProps) {
  const skill = SKILLS.find(s => s.id === skillId);
  if (!skill) return (
    <div className="flex-1 flex items-center justify-center text-neutral-400 text-sm">
      {locale === 'en' ? 'Select a skill' : 'Selecione uma skill'}
    </div>
  );

  const cat = CATEGORIES.find(c => c.id === skill.cat);
  const endYear = skill.end ?? MAX_YEAR;
  const barStart = ((skill.start - MIN_YEAR) / TOTAL_YEARS) * 100;
  const barWidth = ((endYear - skill.start + 1) / TOTAL_YEARS) * 100;

  const levelLabel: Record<string, Record<string, string>> = {
    pt: { advanced: 'Avançado', proficient: 'Proficiente', familiar: 'Familiar' },
    en: { advanced: 'Advanced', proficient: 'Proficient', familiar: 'Familiar' },
  };

  const labels = locale === 'en'
    ? { desc: 'Description', context: 'Professional Context', projects: 'Projects', timeline: 'Timeline', academic: 'Academic Foundation' }
    : { desc: 'Descrição', context: 'Contexto Profissional', projects: 'Projetos', timeline: 'Linha do Tempo', academic: 'Base Acadêmica' };

  return (
    <div className="flex-1 overflow-y-auto p-6 max-w-3xl">
      {/* Header */}
      <div className="border-l-4 mb-6 pl-4" style={{ borderColor: cat?.color }}>
        <div className="flex items-center gap-2 flex-wrap mb-1">
          <h2 className="text-2xl font-bold text-neutral-900">{skill.name}</h2>
          <span className={`text-xs font-bold uppercase px-2 py-0.5 rounded-full ${LEVEL_COLORS[skill.level]}`}>
            {levelLabel[locale]?.[skill.level]}
          </span>
          <span className="text-xs border border-neutral-200 px-2 py-0.5 rounded-full text-neutral-500 bg-neutral-50">
            {cat?.label}
          </span>
        </div>
        <p className="text-sm text-neutral-500">{skill.start}–{skill.end ?? (locale === 'en' ? 'present' : 'presente')}</p>
      </div>

      {/* Description */}
      <div className="mb-5">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-neutral-400 mb-1">{labels.desc}</p>
        <p className="text-sm text-neutral-700 leading-relaxed">{skill.desc}</p>
      </div>

      {/* Timeline bar (Gantt) */}
      <div className="mb-5">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-neutral-400 mb-2">{labels.timeline}</p>
        <div className="flex mb-1">
          {Array.from({ length: TOTAL_YEARS }, (_, i) => MIN_YEAR + i).map(y => (
            <span key={y} className="flex-1 text-center text-[9px] text-neutral-400 font-semibold">{y}</span>
          ))}
        </div>
        <div className="relative h-6 bg-neutral-100 border border-neutral-200 rounded overflow-hidden">
          <div
            className="absolute top-1 bottom-1 rounded opacity-80"
            style={{ left: `${barStart}%`, width: `${barWidth}%`, background: cat?.color }}
          />
        </div>
      </div>

      {/* Professional context */}
      <div className="mb-5">
        <div className="flex items-center gap-2 mb-2">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-violet-500">{labels.context}</p>
          <div className="flex-1 h-px bg-violet-100" />
        </div>
        <div className="bg-violet-50 rounded-r px-4 py-3 text-sm text-neutral-800 leading-relaxed"
          style={{ borderLeft: '3px solid #8b5cf6' }}>
          {skill.context}
        </div>
      </div>

      {/* Academic */}
      {skill.academic && (
        <div className="mb-5">
          <div className="flex items-center gap-2 mb-2">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-sky-500">{labels.academic}</p>
            <div className="flex-1 h-px bg-sky-100" />
          </div>
          <div className="bg-sky-50 rounded-r px-4 py-3 text-sm text-neutral-800"
            style={{ borderLeft: '3px solid #0284c7' }}>
            <span className="font-semibold">{skill.academic.course}</span>
            {' · '}
            <span className="text-sky-600 font-bold">{skill.academic.grade.toFixed(1)}</span>
            <span className="text-neutral-500"> · {skill.academic.year}</span>
          </div>
        </div>
      )}

      {/* Projects */}
      {skill.projects.length > 0 && (
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-widest text-neutral-400 mb-2">{labels.projects}</p>
          <div className="flex flex-wrap gap-2">
            {skill.projects.map((p, i) => (
              <span key={i} className="text-xs px-3 py-1 border border-neutral-200 rounded bg-white text-neutral-700 font-medium">
                {p}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
