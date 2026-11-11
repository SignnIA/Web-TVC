import test from 'node:test';
import assert from 'node:assert/strict';
import { TVC_PROJECTS } from '../data/tvcData';
import {
  TVC_CONTACT_EMAIL,
  buildInquiryMailtoUrl,
  filterProjects,
  getCategoryCounts,
  validateContactForm,
} from './portfolioLogic';

test('getCategoryCounts computes exact project counts for TVC portfolio', () => {
  const counts = getCategoryCounts(TVC_PROJECTS);
  assert.equal(counts.all, 5);
  assert.equal(counts.educativo, 2);
  assert.equal(counts.instalaciones, 2);
  assert.equal(counts['ip-original'], 1);
  assert.equal(counts.advergame, 2);
});

test('filterProjects filters by category and search query accurately', () => {
  const all = filterProjects(TVC_PROJECTS, 'all', '');
  assert.equal(all.length, 5);

  const instalaciones = filterProjects(TVC_PROJECTS, 'instalaciones', '');
  assert.equal(instalaciones.length, 2);
  assert.deepEqual(
    instalaciones.map((p) => p.code),
    ['03.B', '03.D']
  );

  const steamSearch = filterProjects(TVC_PROJECTS, 'all', 'Steam');
  assert.equal(steamSearch.length, 1);
  assert.equal(steamSearch[0].id, 'vagabundo');

  const legislaturaSearch = filterProjects(TVC_PROJECTS, 'educativo', 'Legislatura');
  assert.equal(legislaturaSearch.length, 1);
  assert.equal(legislaturaSearch[0].code, '03.A');
});

test('validateContactForm rejects empty or invalid inputs and accepts valid briefs', () => {
  const invalidResult = validateContactForm({
    name: 'A',
    organization: '',
    email: 'correo-invalido',
    phone: '',
    projectType: '',
    budgetRange: '',
    message: 'Muy corto',
  });

  assert.equal(invalidResult.valid, false);
  assert.ok(invalidResult.errors.name);
  assert.ok(invalidResult.errors.organization);
  assert.ok(invalidResult.errors.email);
  assert.ok(invalidResult.errors.projectType);
  assert.ok(invalidResult.errors.message);

  const validResult = validateContactForm({
    name: 'Mariana Gómez',
    organization: 'Ministerio de Educación',
    email: 'mariana.gomez@educacion.gob.ar',
    phone: '+54 381 555-1234',
    projectType: 'Videojuego Educativo (Edutainment)',
    budgetRange: 'Institucional / A cotizar',
    message: 'Necesitamos desarrollar una aventura gráfica interactiva para escuelas secundarias.',
  });

  assert.equal(validResult.valid, true);
  assert.equal(Object.keys(validResult.errors).length, 0);

  const mailto = buildInquiryMailtoUrl({
    name: 'Mariana Gómez',
    organization: 'Ministerio de Educación',
    email: 'mariana.gomez@educacion.gob.ar',
    phone: '',
    projectType: 'Videojuego Educativo (Edutainment)',
    budgetRange: 'Institucional / A cotizar',
    message: 'Necesitamos desarrollar una aventura gráfica interactiva para escuelas secundarias.',
  });
  assert.ok(mailto.startsWith(`mailto:${TVC_CONTACT_EMAIL}?subject=`));
  assert.equal(TVC_CONTACT_EMAIL, 'info@tvcgames.com');
});

