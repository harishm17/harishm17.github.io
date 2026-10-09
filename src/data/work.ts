export type Group = 'purgo' | 'earlier' | 'research' | 'coursework' | 'projects';
export type Slug = 'agent-retrieval' | 'llm-evaluation' | 'a11y-stem';

export interface ExtLink {
  label: string;
  href: string;
}

export interface WorkItem {
  id: string;
  group: Group;
  title: string;
  context: string;
  years: string;
  summary: string;
  /** Only measured outcomes, with their sample; never activity counts on home. */
  result?: string;
  /** Write-up this row links to (hidden while that write-up is a draft). */
  page?: Slug;
  /** Section id inside the write-up. */
  anchor?: string;
  links?: ExtLink[];
  /** Position under "More work" on the home page; rows without it appear only on /work/. */
  home?: number;
}

/** One of the three areas featured at the top of the home page, in plain language. */
export interface Featured {
  id: string;
  context: string;
  /** Year range or status shown after the context, e.g. "2026" or "in progress". */
  years: string;
  title: string;
  summary: string;
  /** Write-up the title and link line go to; both are hidden while that write-up is a draft. */
  page?: Slug;
  /** Text of the link line under the summary. */
  linkLabel: string;
}

export const GROUPS: { id: Group; title: string; intro?: string }[] = [
  { id: 'purgo', title: 'Purgo AI' },
  { id: 'earlier', title: 'Earlier internships' },
  { id: 'research', title: 'Research' },
  { id: 'coursework', title: 'Coursework' },
  { id: 'projects', title: 'Projects' },
];

export const work: WorkItem[] = [
  {
    id: 'agent-retrieval',
    group: 'purgo',
    title: 'Finding the tables an LLM agent misses',
    context: 'Purgo AI',
    years: '2026',
    summary:
      'Changes to which tables reach the agent: following dbt lineage, a schema check and a faster catalog search, each measured on benchmarks built from real tickets.',
    page: 'agent-retrieval',
  },
  {
    id: 'catalog-search',
    group: 'purgo',
    title: 'Semantic search over data catalogs',
    context: 'Purgo AI',
    years: '2026',
    summary: 'A search path on Pinecone for Iceberg catalogs on Polaris that re-indexes only the tables whose schema changed.',
    page: 'agent-retrieval',
    anchor: 'catalog-search',
  },
  {
    id: 'stage-cost',
    group: 'purgo',
    title: 'Moving two agent stages to a smaller model',
    context: 'Purgo AI',
    years: '2026',
    summary:
      'Compared a smaller reasoning model with the larger one on two agent stages over five runs, then moved both stages to it and set the reasoning effort for each. Retrieval recall held, and the two stages got cheaper.',
    page: 'agent-retrieval',
    anchor: 'cost',
  },
  {
    id: 'llm-evaluation',
    group: 'purgo',
    title: 'Testing LLMs and Databricks platforms for regulated use',
    context: 'Purgo AI',
    years: '2025–26',
    summary:
      'Qualification tests for Azure OpenAI and Databricks-served models (hallucination, bias, determinism, latency, traceability) and for Databricks platforms on Azure and AWS, with evidence an auditor can read.',
    page: 'llm-evaluation',
  },
  {
    id: 'iqoq',
    group: 'purgo',
    title: 'Validation engine for Databricks platforms',
    context: 'Purgo AI',
    years: '2025',
    summary:
      'Runs 59 versioned installation and operational qualification tests in 17 suites against a customer’s Databricks workspace on Azure or AWS, with live progress and an evidence report. Pass/fail logic runs in a sandbox. I wrote most of its current code; a colleague built the first scaffold.',
    page: 'llm-evaluation',
  },
  {
    id: 'self-review',
    group: 'purgo',
    title: 'Self-review for generated code',
    context: 'Purgo AI',
    years: '2026',
    summary:
      'Checks generated code for Databricks runtime failures, each check traced to a real failure. If every candidate fails, the agent gets one recovery attempt, then ships the candidate with the fewest failed checks.',
  },
  {
    id: 'declared-sources',
    group: 'purgo',
    title: 'Declared-source checks for generated dbt code',
    context: 'Purgo AI',
    years: '2026',
    summary:
      'Generated dbt code has to name its sources exactly as the project declares them, so a recurring build failure gets caught in review, before the build.',
  },
  {
    id: 'attachments',
    group: 'purgo',
    title: 'Chunking long ticket attachments',
    context: 'Purgo AI',
    years: '2026',
    summary:
      'Splits long attachments without breaking records apart, and tells the model which parts of a file it didn’t get.',
  },
  {
    id: 'signing',
    group: 'purgo',
    title: 'Signing validation reports in the app',
    context: 'Purgo AI',
    years: '2025',
    summary: 'Embedded DocuSign signing for validation reports, with per-project credentials.',
  },
  {
    id: 'digitus-sql',
    group: 'earlier',
    title: 'Text-to-SQL agent',
    context: 'Digitus, internship',
    years: '2024',
    summary: 'Schema discovery plus retries driven by execution errors.',
    result: 'Execution accuracy 52% to 76% on an internal 500-query set',
    home: 1,
  },
  {
    id: 'digitus-rag',
    group: 'earlier',
    title: 'Assistant over slide decks and videos',
    context: 'Digitus, internship',
    years: '2024',
    summary: 'Multimodal retrieval with layout-aware chunking and citations the model has to give.',
  },
  {
    id: 'pwc',
    group: 'earlier',
    title: 'Demand forecasting and review analysis',
    context: 'PwC, internship',
    years: '2023',
    summary:
      'An XGBoost and SARIMA ensemble for sales forecasting, and aspect-based sentiment analysis over 30k+ customer reviews.',
    result: 'MAPE 15% lower than the baseline across 50+ SKUs',
  },
  {
    id: 'thesis',
    group: 'research',
    title: 'Finding behaviors in mouse videos without labels',
    context: 'Master’s thesis, IIT Madras and The Jackson Laboratory',
    years: '2023–24',
    summary:
      'Segmented pose-tracking video of mice into behaviors with a bidirectional RNN autoencoder and clustering, for genetic analysis. Advised by Balaraman Ravindran and Vivek Kumar.',
    links: [{ label: 'Thesis (PDF)', href: '/Harish___DDP_Report.pdf' }],
    home: 2,
  },
  {
    id: 'microbiome',
    group: 'research',
    title: 'How microbes in homes support each other',
    context: 'Young Research Fellowship, IIT Madras',
    years: '2021–22',
    summary:
      'Built metabolic models of the 20 best-connected species in microbiomes from rural and urban homes, and measured which ones support which with a metabolic support index. Advised by Karthik Raman.',
    links: [{ label: 'Poster (PDF)', href: '/Harish-YRF_poster.pdf' }],
  },
  {
    id: 'tumor',
    group: 'research',
    title: 'Tumor deconvolution',
    context: 'SciWhyLab, research internship',
    years: '2021',
    summary: 'Estimated cell-type proportions from bulk gene expression with dimensionality reduction and an SVM.',
    links: [{ label: 'GitHub', href: 'https://github.com/harishm17/Tumor-Deconvolution-Challenge' }],
  },
  {
    id: 'cs6130',
    group: 'coursework',
    title: 'Classified rank-maximal matchings',
    context: 'Paper presentation, CS6130 Advanced Graph Algorithms, IIT Madras',
    years: '2024',
    summary:
      'Presented a paper’s algorithm for rank-maximal matchings under laminar classifications and its hardness result for the general case.',
    links: [
      { label: 'Report (PDF)', href: '/CS6130_Report.pdf' },
      { label: 'Slides (PDF)', href: '/CS6130.pdf' },
    ],
  },
  {
    id: 'covid',
    group: 'coursework',
    title: 'Gene co-expression networks in COVID-19',
    context: 'Course project, IIT Madras',
    years: '2023',
    summary: 'Network and co-expression analysis of gene expression data to find gene signatures linked to COVID-19.',
    links: [{ label: 'Report (PDF)', href: '/AACB_Report.pdf' }],
  },
  {
    id: 'a11y-stem',
    group: 'projects',
    title: 'a11y-stem',
    context: 'Personal project, in progress',
    years: '2026',
    summary: 'Turns STEM lecture PDFs into accessible HTML, with equations as MathML a screen reader can speak.',
    page: 'a11y-stem',
  },
  {
    id: 'studybuddy',
    group: 'projects',
    title: 'StudyBuddy',
    context: 'Personal project, prototype with no users',
    years: '2025',
    summary:
      'Turns course materials into notes, quizzes and practice exams, with a voice coach on the OpenAI Realtime API.',
  },
  {
    id: 'divvydo',
    group: 'projects',
    title: 'DivvyDo',
    context: 'Personal project',
    years: '2026',
    summary: 'Roommate expense splitting with five split methods and integer-cent rounding.',
  },
  {
    id: 'smart-email',
    group: 'projects',
    title: 'Gmail drafting assistant',
    context: 'Personal project',
    years: '2026',
    summary: 'Drafts an email from a plain-language request, using past Gmail messages for context.',
  },
];

export const featured: Featured[] = [
  {
    id: 'agent-retrieval',
    context: 'Purgo AI',
    years: '2026',
    title: 'Retrieval for an LLM coding agent',
    summary:
      'How Purgo’s agent finds the tables a ticket depends on. Following dbt lineage cut missed tables by about 70% on a benchmark built from real tickets.',
    page: 'agent-retrieval',
    linkLabel: 'Read the case study',
  },
  {
    id: 'llm-evaluation',
    context: 'Purgo AI',
    years: '2025–26',
    title: 'Testing LLMs for regulated use',
    summary: 'Qualification tests for models and Databricks platforms, with evidence an auditor can read.',
    page: 'llm-evaluation',
    linkLabel: 'Read the write-up',
  },
  {
    id: 'a11y-stem',
    context: 'Personal project',
    years: 'in progress',
    title: 'a11y-stem',
    summary:
      'Turning equations in STEM lecture PDFs into MathML a screen reader can speak. Private until the beta.',
    page: 'a11y-stem',
    linkLabel: 'About a11y-stem',
  },
];

export function homeItems(): WorkItem[] {
  return work.filter((w) => w.home !== undefined).sort((a, b) => (a.home ?? 0) - (b.home ?? 0));
}

export function byGroup(group: Group): WorkItem[] {
  return work.filter((w) => w.group === group);
}
