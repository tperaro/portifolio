// src/components/sections/SkillsTimelineSection/SkillsSidebar.tsx
import React, { useState } from 'react';
import { CAREER, CATEGORIES, SKILLS, ACHIEVEMENTS, type CareerEntry, type Category } from '../../../data/skills-data';

interface SkillsSidebarProps {
  mode: 'year' | 'skill';
  selectedYear: number;
  selectedSkillId: string | null;
  onSelectYear: (year: number) => void;
  onSelectSkill: (skillId: string) => void;
  locale?: string;
}

export default function SkillsSidebar({
  mode,
  selectedYear,
  selectedSkillId,
  onSelectYear,
  onSelectSkill,
  locale = 'pt',
}: SkillsSidebarProps) {
  const [openCats, setOpenCats] = useState<Set<string>>(new Set(['ai']));

  const toggleCat = (catId: string) => {
    setOpenCats(prev => {
      const next = new Set(prev);
      next.has(catId) ? next.delete(catId) : next.add(catId);
      return next;
    });
  };

  const label = locale === 'en' ? 'Timeline' : 'Linha do Tempo';
  const catLabel = locale === 'en' ? 'Categories' : 'Categorias';

  if (mode === 'year') {
    const sortedCareer = [...CAREER].sort((a, b) => b.year - a.year);
    return (
      <aside className="w-44 flex-shrink-0 border-r border-neutral-200 bg-white overflow-y-auto">
        <div className="px-4 pt-4 pb-2 text-[10px] font-semibold uppercase tracking-widest text-neutral-400">
          {label}
        </div>
        <ul>
          {sortedCareer.map((entry) => {
            const isActive = entry.year === selectedYear;
            const yearAchievements = ACHIEVEMENTS.filter(a => a.year === entry.year);
            return (
              <li
                key={entry.year}
                onClick={() => onSelectYear(entry.year)}
                className={`px-4 py-3 cursor-pointer border-l-2 transition-colors ${
                  isActive
                    ? 'border-neutral-900 bg-[#F0F0F8]'
                    : 'border-transparent hover:bg-neutral-50'
                }`}
              >
                <span className={`block text-sm font-bold leading-none ${isActive ? 'text-neutral-900' : 'text-neutral-500'}`}>
                  {entry.year}
                </span>
                {entry.role && (
                  <span className="block text-[11px] text-neutral-400 mt-0.5 leading-tight">{entry.role}</span>
                )}
                {yearAchievements.length > 0 && (
                  <div className="flex gap-1 mt-1 flex-wrap">
                    {yearAchievements.map((a, i) => (
                      <span key={i} title={a.label} className="text-xs">{a.icon}</span>
                    ))}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </aside>
    );
  }

  // Skill mode: category accordion
  return (
    <aside className="w-44 flex-shrink-0 border-r border-neutral-200 bg-white overflow-y-auto">
      <div className="px-4 pt-4 pb-2 text-[10px] font-semibold uppercase tracking-widest text-neutral-400">
        {catLabel}
      </div>
      {CATEGORIES.map((cat) => {
        const catSkills = SKILLS.filter(s => s.cat === cat.id);
        const isOpen = openCats.has(cat.id);
        return (
          <div key={cat.id} className="border-b border-neutral-100">
            <button
              onClick={() => toggleCat(cat.id)}
              className="w-full flex items-center gap-2 px-3 py-2.5 text-left hover:bg-neutral-50 transition-colors"
            >
              <span className="w-2 h-2 rounded-sm flex-shrink-0" style={{ background: cat.color }} />
              <span className="text-xs font-semibold text-neutral-600 flex-1 leading-tight">{cat.label}</span>
              <span className="text-[10px] text-neutral-400 bg-neutral-100 px-1.5 rounded-full">{catSkills.length}</span>
              <span className={`text-[8px] text-neutral-400 transition-transform ${isOpen ? 'rotate-90' : ''}`}>▶</span>
            </button>
            {isOpen && (
              <ul>
                {catSkills.map(skill => (
                  <li
                    key={skill.id}
                    onClick={() => onSelectSkill(skill.id)}
                    className={`pl-7 pr-3 py-1.5 text-[11px] cursor-pointer transition-colors ${
                      selectedSkillId === skill.id
                        ? 'text-indigo-600 font-semibold bg-indigo-50'
                        : 'text-neutral-500 hover:text-neutral-800 hover:bg-neutral-50'
                    }`}
                  >
                    {skill.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
      })}
    </aside>
  );
}
