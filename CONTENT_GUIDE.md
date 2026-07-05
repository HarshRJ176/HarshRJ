# Editing Content — Quick Reference

Every piece of text on the site lives in `src/content/*.ts` as plain data.
You never need to touch a component file to update, add, or remove an
entry — edit the array, save, the site rebuilds itself.

**Golden rule:** write like you're telling a recruiter what you did, not
like you're leaving yourself a note. Every field below is what gets
printed on the page, verbatim — no "keep this," "best suited for,"
"should stay," or any other planning language. If a sentence describes
the *portfolio* instead of *you*, delete it.

---

## Add a new project

Open `src/content/projects.ts`, copy this block into the `projects` array
(order = display order, newest first):

```ts
{
  id: 'unique-slug-no-spaces',
  callsign: 'BAY 07',                    // next number in sequence
  title: 'Project Title, Plain English',
  summary: 'One or two sentences: what it is and what it demonstrates.',
  details: [
    'A real technical fact about what you did.',
    'A second real technical fact — result, method, or tool used.',
  ],
  stack: ['Tool 1', 'Tool 2', 'Method'],
  status: 'operational', // or 'in-development' | 'archived'
},
```

## Add a new research entry

Open `src/content/research.ts`, same pattern:

```ts
{
  id: 'unique-slug',
  title: 'Paper Title',
  summary: 'What the paper covers, one or two sentences.',
  status: 'Drafting — finalising X.',   // current real status
  targets: ['Target Journal 1', 'Target Journal 2'],
  details: [
    'The actual technical contribution, stated plainly.',
  ],
},
```

## Add a new experience entry

Open `src/content/experience.ts`:

```ts
{
  id: 'unique-slug',
  period: 'Mon YYYY — Mon YYYY',
  title: 'Job Title',
  org: 'Company Name',
  summary: 'One sentence: what the role was.',
  details: [
    'A specific thing you did or learned — as many as are genuinely true.',
  ],
  kind: 'role', // or 'research' | 'education'
},
```

## Add a new education entry

Open `src/content/education.ts`:

```ts
{
  id: 'unique-slug',
  period: 'Aug YYYY — Jul YYYY',
  title: 'Degree / Certificate Name',
  institution: 'School Name',
  summary: 'What it covered, one sentence.',
  details: [
    'A real detail — coursework focus, result, honours.',
  ],
},
```

## Update contact details

Everything is in `src/content/profile.ts` under the `contact` object.
Rows with an empty value are automatically hidden — so adding your phone
number is as simple as filling in the `phone: ''` line. No other file
needs to change.

## Update the hero (front page) summary

`src/content/profile.ts` → `heroHeadline` (one sentence) and
`heroBullets` (keep to 2 short facts — full detail belongs in the
Experience/Education sections, not the hero).

## Add your photo

Drop a square image (480×480px or larger) at `public/profile-photo.jpg`.
It appears automatically — no code change needed. Until you add one, the
hero shows a clean monogram instead of a broken image.

## Add a new skill cluster

`src/content/skills.ts` — same array pattern, `label` + `summary` +
`skills: [...]`.

---

## Before you publish anything

1. Read every sentence you wrote out loud — if it sounds like a note to
   yourself rather than something you'd say to a recruiter, rewrite it.
2. Run `npm run typecheck` — catches typos in field names instantly.
3. Run `npm run build` — if it succeeds, your content is structurally
   valid.
