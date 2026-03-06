# English Default Locale Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Make English the default language for the public site and ensure all public routes have an English version.

**Architecture:** Update locale defaults in Next.js and runtime helpers so the application consistently treats English as the primary locale. Then complete the `content/en` tree for public pages that currently only exist in the base content directory, while leaving backup and draft-like files untouched.

**Tech Stack:** Next.js, React, TypeScript, Markdown content files, JSON data files

---

### Task 1: Update locale defaults

**Files:**
- Modify: `next.config.js`
- Modify: `src/i18n/useTranslation.ts`
- Modify: `src/utils/local-content.ts`
- Modify: `src/utils/indexer/index.js`

**Step 1: Inspect locale defaults and implicit fallbacks**
- Confirm `defaultLocale` and fallback helpers still point to Portuguese.

**Step 2: Update the default locale to English**
- Set `defaultLocale` to `en`.
- Change runtime locale fallbacks from `pt` to `en`.
- Ensure content loading without an explicit locale reads from English directories.
- Make indexing explicitly use English content.

**Step 3: Verify no remaining Portuguese-by-default fallback remains**
- Search for `|| 'pt'`, `translations.pt`, and implicit `!locale` => Portuguese logic.

### Task 2: Complete English route parity

**Files:**
- Create: `content/en/pages/careers.md`
- Create: `content/en/pages/pricing.md`
- Create: `content/en/pages/blog/case-study-1.md`
- Create: `content/en/pages/blog/case-study-2.md`
- Create: `content/en/pages/blog/case-study-3.md`
- Create: `content/en/pages/blog/five-tips-for-starting-a-startup.md`
- Create: `content/en/pages/blog/how-to-write-a-blog-post-that-will-get-you-more-traffic.md`
- Create: `content/en/pages/blog/surround-yourself-with-right-people.md`
- Create: `content/en/pages/blog/top-twenty-ways-to-save-time.md`
- Create: `content/en/pages/blog/track-the-right-metrics-for-your-business.md`
- Create: `content/en/pages/blog/what-is-a-design-system.md`

**Step 1: Identify public pages missing from `content/en`**
- Ignore backup, updated, and fixed variants that are not distinct public routes.

**Step 2: Add English versions**
- Copy pages that are already written in English.
- Preserve slugs and content structure so routes resolve identically under the English locale.

**Step 3: Audit for obvious untranslated strings**
- Check `content/en` for Portuguese UI copy or accidental references to Portuguese content files.

### Task 3: Verify the user-facing result

**Files:**
- Review: changed files only

**Step 1: Install dependencies in the worktree if needed**
- Run `npm install` in the worktree.

**Step 2: Run validation**
- Run `npm run build`.
- Read lints for changed files.

**Step 3: Spot-check the English site**
- Start the dev server if needed.
- Confirm the default locale serves English content and navigation.
