import { existsSync, readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { parse } from 'yaml';
import { site } from '../../src/data/site';

const wf = parse(readFileSync('.github/workflows/deploy.yml', 'utf8'));

describe('deploy workflow', () => {
  it('builds on PRs to main and deploys only on push to main or manual runs', () => {
    expect(wf.on.push.branches).toEqual(['main']);
    expect(wf.on.pull_request.branches).toEqual(['main']);
    expect(wf.on).toHaveProperty('workflow_dispatch');
    expect(wf.jobs.deploy.if).toBe("github.event_name != 'pull_request'");
    expect(wf.jobs.deploy.needs).toBe('build');
  });

  it('gives Pages write and OIDC only to the deploy job', () => {
    expect(wf.permissions).toEqual({ contents: 'read' });
    expect(wf.jobs.build.permissions).toBeUndefined();
    expect(wf.jobs.deploy.permissions).toEqual({ pages: 'write', 'id-token': 'write' });
    expect(wf.jobs.deploy.environment.name).toBe('github-pages');
  });

  it('never cancels a deploy in progress', () => {
    expect(wf.concurrency).toEqual({ group: 'pages', 'cancel-in-progress': false });
  });

  it('uses the current major versions of the official actions', () => {
    const uses = [...wf.jobs.build.steps, ...wf.jobs.deploy.steps].map((s: { uses?: string }) => s.uses).filter(Boolean);
    expect(uses).toEqual(['actions/checkout@v7', 'withastro/action@v6', 'actions/deploy-pages@v5']);
  });

  it('pings IndexNow after the deploy, with the key the site serves, and never fails the deploy over it', () => {
    const steps = wf.jobs.deploy.steps as { uses?: string; run?: string; env?: Record<string, string>; 'continue-on-error'?: boolean }[];
    expect(steps.map((s) => s.uses ?? 'run')).toEqual(['actions/deploy-pages@v5', 'run']);
    const ping = steps[1];
    expect(ping['continue-on-error']).toBe(true);
    expect(ping.env?.SITE).toBe(site.url);
    const key = ping.env?.INDEXNOW_KEY ?? '';
    expect(key).toMatch(/^[A-Za-z0-9-]{8,128}$/);
    expect(existsSync(`public/${key}.txt`)).toBe(true);
    expect(readFileSync(`public/${key}.txt`, 'utf8').trim()).toBe(key);
    expect(ping.run).toContain('"$SITE/sitemap-0.xml"');
    expect(ping.run).toContain('https://api.indexnow.org/indexnow');
  });
});
