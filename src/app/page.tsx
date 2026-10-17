import type { Metadata } from 'next';
import { Background } from '../components/Background';
import { Contact } from '../components/Contact';
import { Experience } from '../components/Experience';
import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { JsonLd } from '../components/JsonLd';
import { PrintShortcut } from '../components/PrintShortcut';
import { Projects } from '../components/projects/Projects';
import { Skills } from '../components/Skills';
import { companies } from '../data/experience';
import { profile } from '../data/profile';
import { SITE_URL } from '../lib/site';

export const metadata: Metadata = {
  alternates: { canonical: '/' },
};

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: profile.name,
  alternateName: profile.nameEn,
  jobTitle: profile.role,
  description: profile.description,
  url: SITE_URL,
  image: `${SITE_URL}${profile.photo}`,
  worksFor: { '@type': 'Organization', name: companies[0].name },
  alumniOf: { '@type': 'CollegeOrUniversity', name: '서경대학교' },
  knowsAbout: ['React', 'React Native', 'Next.js', 'TypeScript', 'Frontend Development'],
  sameAs: [profile.contacts.github, profile.contacts.linkedin, profile.contacts.velog],
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={personJsonLd} />
      <PrintShortcut />
      <Header />
      <main>
        <Hero />
        <Experience />
        <Projects />
        <Skills />
        <Background />
      </main>
      <Contact />
    </>
  );
}
