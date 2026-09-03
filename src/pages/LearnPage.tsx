import React, { useState } from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { BookOpen, GraduationCap, Users, Search, CheckCircle, ArrowRight, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export const LearnPage: React.FC = () => {
  const [activeAudience, setActiveAudience] = useState<'students' | 'teachers' | 'researchers' | 'explorers'>('students');
  const [activeQuizAnswer, setActiveQuizAnswer] = useState<number | null>(null);

  const learningModules = [
    {
      title: 'Deciphering Ashokan Brahmi & Epigraphy',
      audience: 'students',
      level: 'Introductory',
      time: '25 min',
      summary: 'Learn the phonetic anatomy of early Brahmi script, how James Prinsep deciphered it in 1837, and read your first Ashokan Rock Edict inscription.',
      topics: ['Brahmi Alphabet & Aksharas', 'Prakrit Dialects', 'Royal Epigraphical Formulas'],
      link: '/manuscripts'
    },
    {
      title: 'Chola Panchaloha Metallurgy & Iconometry',
      audience: 'students',
      level: 'Intermediate',
      time: '35 min',
      summary: 'Explore the cire-perdue lost-wax bronze casting process, the ratio mathematics of the Talamana system, and the cosmic symbolism of Nataraja.',
      topics: ['Wax Core Modeling', 'Alluvial Clay Formulation', 'Anandatandava Philosophy'],
      link: '/artifact/nataraja'
    },
    {
      title: 'Pedagogical Curriculum Guide: Ancient Indian Architecture',
      audience: 'teachers',
      level: 'Educator Guide',
      time: '45 min',
      summary: 'Classroom curriculum guide for teaching the transition from rock-cut chaityas to structural stone temples in secondary schools.',
      topics: ['Nagara vs Dravidian Styles', 'Lesson Plans & Visual Quizzes', 'Heritage Fieldwork Guidelines'],
      link: '/discover'
    },
    {
      title: 'Primary Archival Sources & Manuscript Conservation',
      audience: 'researchers',
      level: 'Scholarly',
      time: '60 min',
      summary: 'Methodology for cataloging palm-leaf (Talapatra) and birch-bark (Bhojpatra) folios using metadata standards compatible with the National Manuscripts Mission.',
      topics: ['Physical Preservation Chemistry', 'Paleography Transcription Standards', 'Attribution & Citation'],
      link: '/manuscripts'
    }
  ];

  const filteredModules = learningModules.filter(m => 
    activeAudience === 'explorers' ? true : m.audience === activeAudience
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-12 animate-fadeIn">
      <Breadcrumbs items={[{ label: 'Heritage Education & Learning Paths' }]} />

      {/* Header */}
      <div className="space-y-3 max-w-3xl">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-300 text-xs font-semibold">
          <GraduationCap className="w-3.5 h-3.5 text-[#936B38]" />
          <span>Curriculum-Aligned Cultural Pedagogy</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-stone-900 leading-tight">
          Heritage Learning Portal
        </h1>
        <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
          Grounded, academic learning pathways tailored for high school students, university educators, research scholars, and curious cultural explorers.
        </p>
      </div>

      {/* Audience Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {[
          { id: 'students', label: 'For Students', icon: GraduationCap },
          { id: 'teachers', label: 'For Teachers & Educators', icon: Users },
          { id: 'researchers', label: 'For Academic Researchers', icon: BookOpen },
          { id: 'explorers', label: 'Curious Explorers', icon: Search }
        ].map(tab => {
          const Icon = tab.icon;
          const isSelected = activeAudience === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveAudience(tab.id as any)}
              className={`px-4 py-2.5 rounded-full text-xs font-semibold flex items-center gap-2 transition-all ${
                isSelected
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-100'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Learning Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredModules.map((module, i) => (
          <div
            key={i}
            className="p-8 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono font-bold text-[#936B38] uppercase">
                  {module.level}
                </span>
                <span className="text-stone-400">{module.time}</span>
              </div>
              <h3 className="font-serif text-2xl font-bold text-stone-900 leading-snug">
                {module.title}
              </h3>
              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                {module.summary}
              </p>
              <div className="pt-2">
                <span className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider block mb-1">
                  Core Topics Covered:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {module.topics.map((t, idx) => (
                    <span key={idx} className="text-xs px-2.5 py-1 rounded-lg bg-stone-100 text-stone-700">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-stone-100">
              <Link
                to={module.link}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-900 hover:text-[#936B38] transition-colors"
              >
                <span>Launch Interactive Module</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Knowledge Quiz Checkpoint */}
      <div className="p-8 sm:p-10 rounded-3xl bg-[#FAF8F5] border border-stone-300 shadow-sm space-y-6">
        <div className="space-y-1">
          <span className="text-xs font-bold text-[#936B38] uppercase tracking-wider block flex items-center gap-1.5">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Interactive Epigraphy Checkpoint</span>
          </span>
          <h3 className="font-serif text-2xl font-bold text-stone-900">
            Self-Assessment: The Lion Capital of Ashoka
          </h3>
          <p className="text-xs sm:text-sm text-stone-600">
            Which cardinal animal is NOT depicted on the circular abacus of the Sarnath Lion Capital?
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { text: 'A. An Asiatic Lion', isCorrect: false },
            { text: 'B. A Galloping Horse', isCorrect: false },
            { text: 'C. A Bengal Tiger', isCorrect: true },
            { text: 'D. A Humped Zebu Bull', isCorrect: false }
          ].map((opt, i) => (
            <button
              key={i}
              onClick={() => setActiveQuizAnswer(i)}
              className={`p-4 rounded-2xl text-left border text-xs sm:text-sm font-medium transition-all ${
                activeQuizAnswer === i
                  ? opt.isCorrect
                    ? 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold'
                    : 'bg-rose-50 border-rose-400 text-rose-950'
                  : 'bg-white border-stone-200 hover:bg-stone-50 text-stone-800'
              }`}
            >
              {opt.text}
            </button>
          ))}
        </div>

        {activeQuizAnswer !== null && (
          <div className={`p-4 rounded-2xl text-xs leading-relaxed ${
            activeQuizAnswer === 2 ? 'bg-emerald-100 text-emerald-900' : 'bg-stone-200 text-stone-800'
          }`}>
            {activeQuizAnswer === 2 ? (
              <span>
                <strong>Correct!</strong> The abacus portrays four animals alternating with 24-spoke Dharma Chakras: an elephant (East), a horse (South), a bull (West), and a lion (North). Tigers were not part of the canonical Mauryan abacus schema.
              </span>
            ) : (
              <span>
                Not quite. The correct answer is <strong>C. A Bengal Tiger</strong>. The four canonical animals on the abacus are the elephant, horse, bull, and lion.
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
