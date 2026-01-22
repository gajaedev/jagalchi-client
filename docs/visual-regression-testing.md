# Visual Regression Testing

## Overview

Jagalchi uses [Chromatic](https://www.chromatic.com/) for automated visual regression testing. This ensures that UI components remain visually consistent across code changes.

## What is Visual Regression Testing?

Visual regression testing captures screenshots of UI components and compares them against baseline images. When changes are detected, reviewers can approve or reject the visual differences.

## Components Covered

We have **70+ visual test scenarios** covering:

### Property Panels (20+ scenarios)

- NodePropertiesPanel (2 variants)
- EdgePropertiesPanel (4 single + 3 multi-select variants)
- SectionPropertiesPanel (3 variants)
- ResourcePropertiesPanel (4 variants)
- TextPropertiesPanel (4 variants)

### Interactive Components (15+ scenarios)

- ContextMenu (4 variants with hover/active/disabled states)
- ToolbarButton (5 variants including active/disabled)
- LoadingButton (3 variants including loading/disabled)
- EditorCheckbox (3 variants including indeterminate)

### AI Features (5+ scenarios)

- RoadmapAiModal (3 variants: default, create tab, edit tab)
- RoadmapGenerationForm (2 variants: default, loading)

### Design System (25+ scenarios)

- EditorDivider, EditorTooltip, EditorHeader, EditorToolbar
- ColorPicker, EditorInput, EditorButton, EditorTextarea
- LoadingSpinner, LoadingDots, MultiSelectPanel

### UI Components (20+ scenarios)

- Avatar, Badge, Button, Card, Dialog, Form, Input, Label, ScrollArea, Separator, Textarea, Typography

## Setup

### 1. Create Chromatic Account

1. Visit [chromatic.com](https://www.chromatic.com/)
2. Sign in with GitHub
3. Click "Add project" and select `gajaedev/jagalchi-client`

### 2. Get Project Token

1. In Chromatic dashboard, go to "Manage" → "Configure"
2. Copy your project token
3. It should look like: `chpt_xxxxxxxxxxxxxxxx`

### 3. Add GitHub Secret

1. Go to GitHub repository Settings → Secrets and variables → Actions
2. Click "New repository secret"
3. Name: `CHROMATIC_PROJECT_TOKEN`
4. Value: paste your Chromatic project token
5. Click "Add secret"

### 4. Verify Setup

1. Push a commit or create a PR
2. Check GitHub Actions tab for "Visual Regression Testing" workflow
3. Wait for the workflow to complete
4. Visit Chromatic dashboard to see the build

## Local Testing

Run Chromatic locally to test before pushing:

```bash
# Set your project token (one time)
export CHROMATIC_PROJECT_TOKEN=chpt_xxxxxxxxxxxxxxxx

# Run Chromatic
pnpm chromatic

# Or run Storybook locally to review components
pnpm storybook
```

## How It Works

### Workflow Trigger

The visual regression test runs on:

- Push to `develop` or `main` branches
- Pull requests targeting `develop` or `main`

### Test Process

1. **Build Storybook**: Creates a static Storybook build
2. **Upload to Chromatic**: Sends build to Chromatic cloud
3. **Capture Screenshots**: Chromatic captures all stories
4. **Compare**: Compares against baseline images
5. **Report**: Results are posted as GitHub check

### Auto-Accept Changes

Changes on the `develop` branch are **automatically accepted** to streamline development. This means:

- Visual changes on develop become the new baseline
- PRs to develop will still show visual diffs for review

## Storybook Organization

Stories are organized in three main categories:

```
UI/                          # shadcn/ui components
  ├── Avatar
  ├── Button
  ├── Dialog
  └── ...

Roadmap Editor/
  ├── Atoms/                 # Basic building blocks
  │   ├── EditorButton
  │   ├── EditorCheckbox
  │   ├── ToolbarButton
  │   └── ...
  ├── Molecules/             # Composite components
  │   ├── ContextMenu
  │   ├── RoadmapGenerationForm
  │   └── ...
  └── Organisms/             # Complex components
      ├── EdgePropertiesPanel
      ├── NodePropertiesPanel
      ├── RoadmapAiModal
      └── ...
```

## Writing Stories for Visual Testing

### Basic Story

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { MyComponent } from './MyComponent';

const meta = {
  title: 'Roadmap Editor/Organisms/MyComponent',
  component: MyComponent,
  parameters: {
    layout: 'centered', // or 'fullscreen', 'padded'
  },
  tags: ['autodocs'],
} satisfies Meta<typeof MyComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Example',
    color: '#3b82f6',
  },
};
```

### Interactive Story

For components with state:

```typescript
const InteractiveComponent = () => {
  const [value, setValue] = useState('');
  return <MyComponent value={value} onChange={setValue} />;
};

export const Interactive: Story = {
  render: InteractiveComponent,
};
```

### State Variants

Always include these common variants:

- Default state
- With data/populated
- Disabled state
- Loading state (if applicable)
- Error state (if applicable)
- Empty state (if applicable)

### Accessibility

All stories should:

- Use semantic HTML
- Include ARIA labels
- Support keyboard navigation
- Have sufficient color contrast (WCAG AA)

## Best Practices

### Story Naming

- Use descriptive names: `WithDelete`, `LongContent`, `ThickEdge`
- Group related variants: `Default`, `Active`, `Disabled`
- Indicate states clearly: `Loading`, `Error`, `Empty`

### Component Isolation

- Stories should be self-contained
- Avoid external dependencies when possible
- Use mock data and handlers

### Viewport Testing

Chromatic automatically tests multiple viewports:

- Desktop (1920x1080)
- Tablet (768x1024)
- Mobile (375x667)

To disable viewport testing for a specific story:

```typescript
export const MyStory: Story = {
  parameters: {
    chromatic: { viewports: [1920] }, // Only test desktop
  },
};
```

### Ignore Specific Elements

If parts of your component change frequently (e.g., timestamps):

```typescript
export const MyStory: Story = {
  parameters: {
    chromatic: {
      disableSnapshot: false,
      // Delay for animations
      delay: 300,
    },
  },
};
```

## Reviewing Changes

### In Chromatic Dashboard

1. Click on the build in Chromatic
2. Review each changed component
3. Accept or reject changes
4. Add comments for discussion

### In GitHub PR

1. Chromatic posts a check on your PR
2. Click "Details" to view changes
3. Review must be completed before merging

## Troubleshooting

### Build Fails

**Error**: `Failed to build Storybook`

**Solution**: Check that Storybook builds locally:

```bash
pnpm build-storybook
```

### Token Not Found

**Error**: `CHROMATIC_PROJECT_TOKEN is not set`

**Solution**: Add the secret in GitHub repository settings (see Setup section)

### Snapshot Differences

**Expected**: Visual changes are detected

**Action**: Review in Chromatic dashboard and accept/reject changes

### Timeout

**Error**: `Chromatic build timed out`

**Solution**:

- Reduce number of stories (break into multiple builds)
- Increase timeout in workflow (default: 10 minutes)

## FAQ

### Do I need to run Chromatic locally?

No, it runs automatically on PR. Local testing is optional but helpful.

### How much does Chromatic cost?

Free for open-source projects with reasonable usage. Check [Chromatic pricing](https://www.chromatic.com/pricing) for details.

### Can I disable visual regression for certain PRs?

Yes, add `[skip chromatic]` to your commit message.

### How do I test hover states?

Use Storybook's interaction testing:

```typescript
import { within, userEvent } from '@storybook/test';

export const WithHover: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');
    await userEvent.hover(button);
  },
};
```

## Resources

- [Chromatic Documentation](https://www.chromatic.com/docs/)
- [Storybook Documentation](https://storybook.js.org/docs)
- [Visual Testing Best Practices](https://www.chromatic.com/docs/visual-testing-best-practices)
- [Writing Stories](https://storybook.js.org/docs/writing-stories)

## Maintenance

### Adding New Components

1. Create Storybook stories in `src/stories/`
2. Follow naming conventions and directory structure
3. Include all relevant variants
4. Test locally with `pnpm storybook`
5. Push and verify in Chromatic

### Updating Baselines

When intentional visual changes are made:

1. Push changes to a PR
2. Review Chromatic build
3. Accept new baselines in Chromatic dashboard
4. Merge PR

### Monitoring

- Check Chromatic dashboard weekly
- Review any failing builds
- Keep stories up-to-date with component changes
