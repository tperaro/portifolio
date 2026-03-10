'use client';
import React, { useState } from 'react';
import { CAREER } from '../../../data/skills-data';
import SkillsSidebar from './SkillsSidebar';
import SkillsYearPanel from './SkillsYearPanel';
import SkillsDetailPanel from './SkillsDetailPanel';
import { getDataAttrs } from '../../../utils/get-data-attrs';

interface SkillsTimelineSectionProps {
  title?: string;
  subtitle?: string;
  locale?: string;
  elementId?: string;
  [key: string]: any;
}

type Mode = 'year' | 'skill';

const LATEST_YEAR = Math.max(...CAREER.map(c => c.year));

export default function SkillsTimelineSection(props: SkillsTimelineSectionProps) {
  const { title, subtitle, locale = 'pt', elementId, ...rest } = props;
  const [mode, setMode] = useState<Mode>('year');
  const [selectedYear, setSelectedYear] = useState<number>(LATEST_YEAR);
  const [selectedSkillId, setSelectedSkillId] = useState<string | null>(null);

  const labels = locale === 'en'
    ? { byYear: 'By Year', bySkill: 'By Skill', pageTitle: title || 'Technical Skills', pageSubtitle: subtitle || 'Explore my technical evolution by year or skill category' }
    : { byYear: 'Por Ano', bySkill: 'Por Skill', pageTitle: title || 'Habilidades Técnicas', pageSubtitle: subtitle || 'Explore minha evolução técnica por ano ou por categoria de skill' };

  const handleSelectSkill = (skillId: string) => {
    setSelectedSkillId(skillId);
    if (mode !== 'skill') setMode('skill');
  };

  const handleModeChange = (newMode: Mode) => {
    setMode(newMode);
    if (newMode === 'skill' && !selectedSkillId) {
      setSelectedSkillId('langgraph'); // default skill
    }
  };

  return (
    <div id={elementId} className="flex flex-col" style={{ minHeight: 'calc(100vh - 80px)' }} {...getDataAttrs(rest)}>
      {/* Hero strip */}
      <div className="bg-[#E8E8F5] px-6 py-8">
        <h1 className="text-2xl font-bold text-neutral-900 mb-1">{labels.pageTitle}</h1>
        <p className="text-sm text-neutral-500 mb-5">{labels.pageSubtitle}</p>
        {/* Mode toggle */}
        <div className="flex w-fit">
          <button
            onClick={() => handleModeChange('year')}
            className={`px-5 py-2 text-sm font-medium rounded-l transition-colors ${
              mode === 'year'
                ? 'bg-neutral-900 text-white'
                : 'bg-white text-neutral-600 border border-neutral-200 hover:bg-neutral-50'
            }`}
          >
            {labels.byYear}
          </button>
          <button
            onClick={() => handleModeChange('skill')}
            className={`px-5 py-2 text-sm font-medium rounded-r transition-colors border-l-0 ${
              mode === 'skill'
                ? 'bg-neutral-900 text-white'
                : 'bg-white text-neutral-600 border border-neutral-200 hover:bg-neutral-50'
            }`}
          >
            {labels.bySkill}
          </button>
        </div>
      </div>

      {/* Main layout: sidebar + content */}
      <div className="flex flex-1 bg-neutral-50">
        <SkillsSidebar
          mode={mode}
          selectedYear={selectedYear}
          selectedSkillId={selectedSkillId}
          onSelectYear={setSelectedYear}
          onSelectSkill={handleSelectSkill}
          locale={locale}
        />
        {mode === 'year' ? (
          <SkillsYearPanel
            year={selectedYear}
            onSkillClick={handleSelectSkill}
            locale={locale}
          />
        ) : (
          <SkillsDetailPanel
            skillId={selectedSkillId ?? 'langgraph'}
            locale={locale}
          />
        )}
      </div>
    </div>
  );
}
