import { useEffect, useRef, lazy, Suspense } from 'react';

import { useOpeningTimeline } from './cinematic/useOpeningTimeline';
import { useScrollNarrative } from './cinematic/useScrollNarrative';
import { OpeningOverlay } from './cinematic/OpeningOverlay';
import { HeroSection } from './cinematic/HeroSection';
import { useLenis } from './hooks/useLenis';
import { NavDock } from './ui/NavDock';
import { MissionBrief } from './mission/MissionBrief';
import { ExperienceBay } from './mission/ExperienceBay';
import { EducationTrack } from './mission/EducationTrack';
import { ProjectsDockingBays } from './mission/ProjectsDockingBays';
import { ResearchArchive } from './mission/ResearchArchive';
import { OrbitalSkillsNetwork } from './mission/OrbitalSkillsNetwork';
import { ContactTerminal } from './mission/ContactTerminal';

const Scene3D = lazy(() => import('./engine/Scene3D').then((m) => ({ default: m.Scene3D })));

export function App() {
  const heroTriggerRef = useRef<HTMLElement | null>(null);
  const heroTextRef = useRef<HTMLDivElement | null>(null);

  const { stage, openingComplete, skip } = useOpeningTimeline(heroTextRef);

  useScrollNarrative({
    triggerRef: heroTriggerRef,
    heroTextRef,
    enabled: openingComplete,
  });

  useLenis(openingComplete);

  useEffect(() => {
    document.documentElement.classList.toggle('scroll-locked', !openingComplete);
  }, [openingComplete]);

  return (
    <div className="app-engine">
      <div className="scene-canvas-mount">
        <Suspense fallback={null}>
          <Scene3D />
        </Suspense>
      </div>

      <OpeningOverlay stage={stage} onSkip={skip} />
      <NavDock visible={openingComplete} />

      <main className="ui-overlay">
        <HeroSection ref={heroTriggerRef} heroTextRef={heroTextRef} />
        <MissionBrief />
        <ExperienceBay />
        <EducationTrack />
        <ProjectsDockingBays />
        <ResearchArchive />
        <OrbitalSkillsNetwork />
        <ContactTerminal />
      </main>
    </div>
  );
}
