import React, { useState, useEffect } from 'react';
import { 
  Calendar, Lightbulb, Award, ChevronRight, Info, 
  BookOpen, Home, Trophy, Search, Star 
} from 'lucide-react';

// --- MOCK DATA ---
const mockAwards = [
  {
    id: '1',
    title: "IEEE MGA Larry K. Wilson Regional Student Volunteer Award",
    scope: 'R9 (Latinoamérica)',
    deadline: '2026-03-31',
    category: 'Estudiantil',
    description: "Reconocimiento al estudiante que más ha impactado su sección mediante actividades innovadoras.",
    requirements: ["Ser miembro activo", "Carta de recomendación del Chair", "Reporte de actividades vTools"],
    tips: ["Enfócate en métricas: ¿cuántas personas asistieron a tus eventos?", "Resalta el liderazgo de equipos."]
  },
  {
    id: '2',
    title: "Premio a la Excelencia Académica IEEE Colombia",
    scope: 'Sección Colombia',
    deadline: '2026-04-15',
    category: 'Profesional/Estudiantil',
    description: "Premio para estudiantes de último año con proyectos de grado destacados.",
    requirements: ["Promedio > 4.0", "Resumen del proyecto (500 palabras)", "Aval de un mentor profesional"],
    tips: ["No uses lenguaje demasiado técnico en el resumen.", "El impacto social del proyecto suma puntos extra."]
  },
  {
    id: '3',
    title: "Richard E. Merwin Student Scholarship",
    scope: 'Global',
    deadline: '2026-09-30',
    category: 'Estudiantil',
    description: "Beca de excelencia para líderes de Computer Society.",
    requirements: ["Mínimo 2 semestres restantes", "Miembro de IEEE Computer Society", "GPA sobresaliente"],
    tips: ["Demuestra tu pasión por la computación.", "Pide las cartas de recomendación con 1 mes de antelación."]
  }
];

// --- COMPONENTS ---

const Badge = ({ children, variant = 'default' }: { children: React.ReactNode, variant?: string }) => {
  const styles = variant === 'outline' 
    ? "border border-slate-200 text-slate-600" 
    : "bg-[#C4D600] text-[#00629B] font-bold";
  return <span className={`text-[10px] px-2 py-0.5 rounded-full ${styles}`}>{children}</span>;
};

// --- PANTALLA 1: HOME ---
const HomeView = ({ onNavigate }: { onNavigate: (v: string) => void }) => (
  <div className="space-y-6 animate-in fade-in duration-700">
    <div className="relative overflow-hidden bg-[#00629B] text-white p-8 rounded-3xl shadow-xl">
      <div className="relative z-10">
        <h1 className="text-3xl font-bold mb-2">Premios IEEE Colombia</h1>
        <p className="text-blue-100 text-sm max-w-[280px]">Tu portal centralizado para convocatorias nacionales e internacionales.</p>
        <button 
          onClick={() => onNavigate('calendar')}
          className="mt-6 bg-[#C4D600] text-[#00629B] px-6 py-2 rounded-full font-bold text-sm hover:scale-105 transition-transform"
        >
          Ver Convocatorias
        </button>
      </div>
      <Trophy className="absolute -right-4 -bottom-4 w-40 h-40 text-white/10 rotate-12" />
    </div>

    <div className="grid grid-cols-1 gap-4">
      <h3 className="font-bold text-slate-800 px-1">Explorar</h3>
      <div 
        onClick={() => onNavigate('tips')}
        className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-2xl shadow-sm cursor-pointer hover:border-[#C4D600] transition-colors"
      >
        <div className="flex items-center gap-4">
          <div className="p-3 bg-yellow-50 rounded-xl"><Lightbulb className="text-yellow-600" /></div>
          <div>
            <p className="font-bold text-slate-700">Guía de Postulación</p>
            <p className="text-xs text-slate-400">Tips de redacción y requisitos</p>
          </div>
        </div>
        <ChevronRight className="text-slate-300" />
      </div>
    </div>
  </div>
);

// --- PANTALLA 2: CALENDARIO ---
const CalendarView = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return (
    <div className="space-y-4 p-4">
      {[1, 2, 3].map(i => <div key={i} className="h-32 w-full bg-slate-200 animate-pulse rounded-2xl" />)}
    </div>
  );

  return (
    <div className="space-y-4 animate-in slide-in-from-bottom-4">
      <div className="flex justify-between items-center px-1">
        <h2 className="text-xl font-bold text-[#00629B]">Próximos Cierres</h2>
        <Badge variant="outline">{mockAwards.length} Activos</Badge>
      </div>
      {mockAwards.map(award => (
        <div key={award.id} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-3">
            <Badge>{award.scope}</Badge>
            <span className="text-xs font-bold text-red-500 flex items-center gap-1">
              <Calendar className="w-3 h-3" /> {award.deadline}
            </span>
          </div>
          <h3 className="font-bold text-slate-800 leading-tight mb-2">{award.title}</h3>
          <p className="text-xs text-slate-500 line-clamp-2 mb-4">{award.description}</p>
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              <div className="w-6 h-6 rounded-full bg-blue-100 border-2 border-white flex items-center justify-center text-[8px] font-bold">ST</div>
              <div className="w-6 h-6 rounded-full bg-green-100 border-2 border-white flex items-center justify-center text-[8px] font-bold">PR</div>
            </div>
            <span className="text-[10px] text-slate-400">Dirigido a: {award.category}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

// --- PANTALLA 3: TIPS ---
const TipsView = () => (
  <div className="space-y-6 animate-in slide-in-from-right-4">
    <h2 className="text-xl font-bold text-[#00629B] px-1">Tips para Ganadores</h2>
    
    <div className="bg-[#C4D600]/10 p-6 rounded-3xl border border-[#C4D600]/20">
      <div className="flex items-center gap-2 mb-4">
        <Star className="text-[#00629B] fill-[#00629B] w-5 h-5" />
        <h4 className="font-bold text-[#00629B]">Regla de Oro</h4>
      </div>
      <p className="text-sm text-slate-700 italic">
        "No asumas que el jurado conoce tu trayectoria. Documenta cada impacto con evidencias verificables."
      </p>
    </div>

    <div className="space-y-4">
      <h3 className="font-bold text-sm uppercase text-slate-400 tracking-widest px-1">Consejos por Award</h3>
      {mockAwards.map(award => (
        <details key={award.id} className="group bg-white border border-slate-100 rounded-xl overflow-hidden">
          <summary className="list-none p-4 flex justify-between items-center cursor-pointer">
            <span className="text-sm font-bold text-slate-700">{award.title}</span>
            <ChevronRight className="w-4 h-4 transition-transform group-open:rotate-90" />
          </summary>
          <div className="p-4 pt-0 border-t border-slate-50">
            <ul className="space-y-2">
              {award.tips.map((tip, i) => (
                <li key={i} className="text-xs text-slate-600 flex gap-2 italic">
                  <span>•</span> {tip}
                </li>
              ))}
            </ul>
          </div>
        </details>
      ))}
    </div>
  </div>
);

// --- MAIN APP ---
export default function App() {
  const [view, setView] = useState('home');

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-900 pb-20">
      {/* Header Desktop */}
      <nav className="max-w-md mx-auto bg-white/80 backdrop-blur-md sticky top-0 z-50 p-4 flex justify-between items-center border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#00629B] rounded-lg flex items-center justify-center">
            <Award className="text-white w-5 h-5" />
          </div>
          <span className="font-black text-[#00629B] tracking-tight">IEEE COL</span>
        </div>
        <Search className="w-5 h-5 text-slate-400" />
      </nav>

      {/* Content Container */}
      <div className="max-w-md mx-auto p-4">
        {view === 'home' && <HomeView onNavigate={setView} />}
        {view === 'calendar' && <CalendarView />}
        {view === 'tips' && <TipsView />}
      </div>

      {/* Bottom Navigation */}
      <div className="max-w-md mx-auto fixed bottom-4 left-4 right-4 bg-[#00629B] rounded-2xl shadow-2xl p-2 flex justify-around items-center">
        <button 
          onClick={() => setView('home')}
          className={`flex flex-col items-center p-2 rounded-xl transition-colors ${view === 'home' ? 'bg-white/10 text-[#C4D600]' : 'text-white/60'}`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] mt-1 font-medium">Inicio</span>
        </button>
        <button 
          onClick={() => setView('calendar')}
          className={`flex flex-col items-center p-2 rounded-xl transition-colors ${view === 'calendar' ? 'bg-white/10 text-[#C4D600]' : 'text-white/60'}`}
        >
          <Calendar className="w-5 h-5" />
          <span className="text-[10px] mt-1 font-medium">Cierres</span>
        </button>
        <button 
          onClick={() => setView('tips')}
          className={`flex flex-col items-center p-2 rounded-xl transition-colors ${view === 'tips' ? 'bg-white/10 text-[#C4D600]' : 'text-white/60'}`}
        >
          <Lightbulb className="w-5 h-5" />
          <span className="text-[10px] mt-1 font-medium">Tips</span>
        </button>
      </div>
    </div>
  );
}
