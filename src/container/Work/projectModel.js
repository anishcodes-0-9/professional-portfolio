// Normalizes the two raw project data arrays in anishData.js into two
// independent presentation-layer segments — professional and personal.
// Each project's `type` field (set explicitly in anishData.js) is the
// source of truth for its segment; the array it lives in is only a
// fallback for data that predates the field. Adding a project to either
// source array with the right `type` flows through automatically — the
// carousel and rendering layer never branch on title, id, or position.

const slugify = (title) => title
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/(^-|-$)/g, '');

// "Claude AI Evaluation (Anthropic via Alignerr)" -> splits a string that
// already exists in the data into a title and a context line, rather
// than inventing a new field.
const splitContext = (title) => {
  const match = title.match(/^(.*?)\s\((.+)\)$/);
  return match ? { title: match[1], context: match[2] } : { title, context: null };
};

const normalizeProject = (project, index, fallbackType, fallbackStatus) => {
  const { title, context } = splitContext(project.title);
  return {
    id: slugify(project.title),
    index,
    type: project.type ?? fallbackType,
    title,
    context,
    period: project.period ?? null,
    status: project.status ?? fallbackStatus,
    confidential: Boolean(project.confidential),
    description: project.description,
    tags: project.tags,
    logoKey: project.logoKey ?? null,
    brandLabel: project.brandLabel ?? null,
    image: project.image ?? null,
    images: project.images ?? [],
    links: {
      github: project.github ?? null,
      live: project.live ?? null,
    },
  };
};

// Returns { professional, personal } — each array carries its own
// segment-local `index` (0-based within that segment), which is exactly
// what carouselMath's wrapping/distance functions expect when each
// segment runs as its own independent pinned carousel.
export const buildProjectSegments = (enterpriseProjects, personalProjects) => ({
  professional: enterpriseProjects.map((project, i) => (
    normalizeProject(project, i, 'professional', 'Production Experience')
  )),
  personal: personalProjects.map((project, i) => (
    normalizeProject(project, i, 'personal', 'Personal Build')
  )),
});
