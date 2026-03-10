// src/components/sections/SkillsTimelineSection/SkillsYearPanel.tsx
import React from 'react';
import { CAREER, CATEGORIES, SKILLS, ACHIEVEMENTS, type Skill } from '../../../data/skills-data';

interface SkillsYearPanelProps {
  year: number;
  onSkillClick: (skillId: string) => void;
  locale?: string;
}

const LEVEL_COLORS: Record<string, string> = {
  advanced:   'bg-violet-100 text-violet-700',
  proficient: 'bg-blue-100 text-blue-700',
  familiar:   'bg-neutral-100 text-neutral-600',
};

const LEVEL_LABELS: Record<string, Record<string, string>> = {
  pt: { advanced: 'avançado', proficient: 'proficiente', familiar: 'familiaridade' },
  en: { advanced: 'advanced', proficient: 'proficient',  familiar: 'familiar' },
};

const totalYears = CAREER[CAREER.length - 1].year - CAREER[0].year + 1;

export default function SkillsYearPanel({ year, onSkillClick, locale = 'pt' }: SkillsYearPanelProps) {
  const career = CAREER.find(c => c.year === year);
  const skillsThisYear = SKILLS.filter(s => s.start <= year && (s.end === null || s.end >= year));
  const newSkills = SKILLS.filter(s => s.start === year);
  const achievements = ACHIEVEMENTS.filter(a => a.year === year);

  const catOrder = ['ai', 'python', 'java', 'frontend', 'devops', 'integrations'];
  const grouped: Record<string, Skill[]> = {};
  catOrder.forEach(cat => {
    const inCat = skillsThisYear.filter(s => s.cat === cat);
    if (inCat.length > 0) grouped[cat] = inCat;
  });

  const labels = locale === 'en'
    ? { newThisYear: 'New this year', active: 'Active skills', achievements: 'Achievements' }
    : { newThisYear: 'Skills deste ano', active: 'Skills ativas', achievements: 'Conquistas' };

  return (
    <div className="flex-1 overflow-y-auto p-6">
      {/* Year header */}
      <div className="flex items-center gap-3 mb-5">
        <span className="text-2xl font-bold text-neutral-900">{year}</span>
        {career && (
          <span className="text-xs bg-neutral-900 text-white px-3 py-1 rounded">
            {career.role}
          </span>
        )}
        {career && (
          <span className="text-xs text-neutral-400 ml-auto">{career.company}</span>
        )}
      </div>

      {/* Career note */}
      {career?.note && (
        <p className="text-sm text-neutral-500 mb-5 leading-relaxed">{career.note}</p>
      )}

      {/* Achievements */}
      {achievements.length > 0 && (
        <div className="mb-5">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-neutral-400 mb-2">{labels.achievements}</p>
          <div className="flex flex-col gap-2">
            {achievements.map((a) => (
              <div key={`${a.year}-${a.label}`} className="flex items-start gap-3 bg-white border border-neutral-200 rounded-lg px-4 py-3">
                <span className="text-xl">{a.icon}</span>
                <div>
                  <p className="text-sm font-semibold text-neutral-800">{a.label}</p>
                  <p className="text-xs text-neutral-500">{a.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* New skills this year */}
      {newSkills.length > 0 && (
        <div className="mb-5">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-neutral-400 mb-2">{labels.newThisYear}</p>
          <div className="flex flex-wrap gap-2">
            {newSkills.map(skill => {
              const cat = CATEGORIES.find(c => c.id === skill.cat);
              return (
                <button
                  key={skill.id}
                  onClick={() => onSkillClick(skill.id)}
                  className="px-3 py-1 rounded text-xs font-medium border hover:opacity-80 transition-opacity"
                  style={{ borderColor: cat?.color + '40', color: cat?.color, background: cat?.color + '12' }}
                >
                  {skill.name}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* All active skills grouped by category */}
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-widest text-neutral-400 mb-3">{labels.active}</p>
        {Object.entries(grouped).map(([catId, skills]) => {
          const cat = CATEGORIES.find(c => c.id === catId);
          return (
            <div key={catId} className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2.5 h-2.5 rounded-sm" style={{ background: cat?.color }} />
                <span className="text-[11px] font-bold uppercase tracking-wide text-neutral-500">{cat?.label}</span>
                <span className="ml-auto text-[10px] text-neutral-400 bg-neutral-100 px-1.5 rounded-full">{skills.length}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {skills.map(skill => (
                  <button
                    key={skill.id}
                    onClick={() => onSkillClick(skill.id)}
                    className="bg-white border border-neutral-200 rounded-lg p-2.5 text-left hover:shadow-sm hover:-translate-y-0.5 transition-all"
                  >
                    <div className="flex items-start justify-between gap-1">
                      <span className="text-xs font-semibold text-neutral-800 leading-tight">{skill.name}</span>
                      <span className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded-full flex-shrink-0 ${LEVEL_COLORS[skill.level]}`}>
                        {LEVEL_LABELS[locale]?.[skill.level] ?? skill.level}
                      </span>
                    </div>
                    {/* Year bar */}
                    <div className="mt-2 h-1 bg-neutral-100 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full opacity-70"
                        style={{
                          background: cat?.color,
                          width: `${Math.min(100, ((year - skill.start + 1) / totalYears) * 100)}%`,
                        }}
                      />
                    </div>
                    <p className="text-[9px] text-neutral-400 mt-1">{skill.start}–{skill.end ?? (locale === 'en' ? 'present' : 'atual')}</p>
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
