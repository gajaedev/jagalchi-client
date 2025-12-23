import type { Meta, StoryObj } from '@storybook/react';

const Typography = () => {
  return (
    <div className="bg-background flex min-h-screen w-full flex-col items-start p-8">
      <div className="border-border mb-12 flex w-full flex-col gap-4 border-b pb-8">
        <h1 className="text-foreground text-[length:var(--heading-1-size)] leading-[var(--heading-1-line-height)] font-semibold tracking-[var(--heading-1-letter-spacing)]">
          Typography
        </h1>
        <p className="text-muted-foreground text-[length:var(--paragraph-regular-size)] leading-[var(--paragraph-regular-line-height)] font-normal tracking-[var(--paragraph-regular-letter-spacing)]">
          Your project&apos;s type style. Note that the display of this depends on variables, see
          the Theming documentation.
        </p>
      </div>

      <div className="flex w-full flex-col gap-8">
        <h1 className="text-foreground text-[length:var(--heading-1-size)] leading-[var(--heading-1-line-height)] font-semibold tracking-[var(--heading-1-letter-spacing)] whitespace-nowrap">
          heading 1
        </h1>

        <h2 className="text-foreground text-[length:var(--heading-2-size)] leading-[var(--heading-2-line-height)] font-semibold tracking-[var(--heading-2-letter-spacing)] whitespace-nowrap">
          heading 2
        </h2>

        <h3 className="text-foreground text-[length:var(--heading-3-size)] leading-[var(--heading-3-line-height)] font-semibold tracking-[var(--heading-3-letter-spacing)] whitespace-nowrap">
          heading 3
        </h3>

        <h4 className="text-foreground text-[length:var(--heading-4-size)] leading-[var(--heading-4-line-height)] font-semibold tracking-[var(--heading-4-letter-spacing)] whitespace-nowrap">
          heading 4
        </h4>

        <p className="text-muted-foreground font-mono text-[length:var(--paragraph-regular-size)] leading-[var(--paragraph-regular-line-height)] font-normal tracking-[0px] whitespace-nowrap">
          monospaced
        </p>

        <p className="text-muted-foreground text-[length:var(--paragraph-regular-size)] leading-[var(--paragraph-regular-line-height)] font-normal tracking-[var(--paragraph-regular-letter-spacing)] whitespace-nowrap">
          paragraph regular
        </p>

        <p className="text-muted-foreground text-[length:var(--paragraph-regular-size)] leading-[var(--paragraph-regular-line-height)] font-medium tracking-[var(--paragraph-regular-letter-spacing)] whitespace-nowrap">
          paragraph medium
        </p>

        <p className="text-muted-foreground text-[length:var(--paragraph-regular-size)] leading-[var(--paragraph-regular-line-height)] font-semibold tracking-[var(--paragraph-regular-letter-spacing)]">
          paragraph bold
        </p>

        <p className="text-muted-foreground text-[length:var(--paragraph-small-size)] leading-[var(--paragraph-small-line-height)] font-normal tracking-[var(--paragraph-small-letter-spacing)] whitespace-nowrap">
          paragraph small
        </p>

        <p className="text-muted-foreground text-[length:var(--paragraph-small-size)] leading-[var(--paragraph-small-line-height)] font-medium tracking-[var(--paragraph-small-letter-spacing)] whitespace-nowrap">
          paragraph small medium
        </p>

        <p className="text-muted-foreground text-[length:var(--paragraph-mini-size)] leading-[var(--paragraph-mini-line-height)] font-semibold tracking-[var(--paragraph-mini-letter-spacing)] whitespace-nowrap">
          paragraph mini bold
        </p>

        <p className="text-muted-foreground text-[length:var(--paragraph-mini-size)] leading-[var(--paragraph-mini-line-height)] font-medium tracking-[var(--paragraph-mini-letter-spacing)] whitespace-nowrap">
          paragraph mini medium
        </p>

        <p className="text-muted-foreground text-[length:var(--paragraph-mini-size)] leading-[var(--paragraph-mini-line-height)] font-normal tracking-[var(--paragraph-mini-letter-spacing)] whitespace-nowrap">
          paragraph mini
        </p>
      </div>
    </div>
  );
};

const meta = {
  title: 'Design System/Typography',
  component: Typography,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Typography>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllVariants: Story = {};

export const Headings: Story = {
  render: () => (
    <div className="flex flex-col gap-6 p-8">
      <h1 className="text-foreground text-[length:var(--heading-1-size)] leading-[var(--heading-1-line-height)] font-semibold tracking-[var(--heading-1-letter-spacing)]">
        Heading 1 - 48px
      </h1>
      <h2 className="text-foreground text-[length:var(--heading-2-size)] leading-[var(--heading-2-line-height)] font-semibold tracking-[var(--heading-2-letter-spacing)]">
        Heading 2 - 30px
      </h2>
      <h3 className="text-foreground text-[length:var(--heading-3-size)] leading-[var(--heading-3-line-height)] font-semibold tracking-[var(--heading-3-letter-spacing)]">
        Heading 3 - 24px
      </h3>
      <h4 className="text-foreground text-[length:var(--heading-4-size)] leading-[var(--heading-4-line-height)] font-semibold tracking-[var(--heading-4-letter-spacing)]">
        Heading 4 - 20px
      </h4>
    </div>
  ),
};

export const Paragraphs: Story = {
  render: () => (
    <div className="flex flex-col gap-6 p-8">
      <div>
        <p className="text-muted-foreground mb-1 text-xs">Regular - 16px</p>
        <p className="text-muted-foreground text-[length:var(--paragraph-regular-size)] leading-[var(--paragraph-regular-line-height)] font-normal tracking-[var(--paragraph-regular-letter-spacing)]">
          The quick brown fox jumps over the lazy dog
        </p>
      </div>
      <div>
        <p className="text-muted-foreground mb-1 text-xs">Medium - 16px</p>
        <p className="text-muted-foreground text-[length:var(--paragraph-regular-size)] leading-[var(--paragraph-regular-line-height)] font-medium tracking-[var(--paragraph-regular-letter-spacing)]">
          The quick brown fox jumps over the lazy dog
        </p>
      </div>
      <div>
        <p className="text-muted-foreground mb-1 text-xs">Bold - 16px</p>
        <p className="text-muted-foreground text-[length:var(--paragraph-regular-size)] leading-[var(--paragraph-regular-line-height)] font-semibold tracking-[var(--paragraph-regular-letter-spacing)]">
          The quick brown fox jumps over the lazy dog
        </p>
      </div>
      <div>
        <p className="text-muted-foreground mb-1 text-xs">Small - 14px</p>
        <p className="text-muted-foreground text-[length:var(--paragraph-small-size)] leading-[var(--paragraph-small-line-height)] font-normal tracking-[var(--paragraph-small-letter-spacing)]">
          The quick brown fox jumps over the lazy dog
        </p>
      </div>
      <div>
        <p className="text-muted-foreground mb-1 text-xs">Small Medium - 14px</p>
        <p className="text-muted-foreground text-[length:var(--paragraph-small-size)] leading-[var(--paragraph-small-line-height)] font-medium tracking-[var(--paragraph-small-letter-spacing)]">
          The quick brown fox jumps over the lazy dog
        </p>
      </div>
      <div>
        <p className="text-muted-foreground mb-1 text-xs">Mini - 12px</p>
        <p className="text-muted-foreground text-[length:var(--paragraph-mini-size)] leading-[var(--paragraph-mini-line-height)] font-normal tracking-[var(--paragraph-mini-letter-spacing)]">
          The quick brown fox jumps over the lazy dog
        </p>
      </div>
      <div>
        <p className="text-muted-foreground mb-1 text-xs">Mini Medium - 12px</p>
        <p className="text-muted-foreground text-[length:var(--paragraph-mini-size)] leading-[var(--paragraph-mini-line-height)] font-medium tracking-[var(--paragraph-mini-letter-spacing)]">
          The quick brown fox jumps over the lazy dog
        </p>
      </div>
      <div>
        <p className="text-muted-foreground mb-1 text-xs">Mini Bold - 12px</p>
        <p className="text-muted-foreground text-[length:var(--paragraph-mini-size)] leading-[var(--paragraph-mini-line-height)] font-semibold tracking-[var(--paragraph-mini-letter-spacing)]">
          The quick brown fox jumps over the lazy dog
        </p>
      </div>
    </div>
  ),
};

export const Monospace: Story = {
  render: () => (
    <div className="flex flex-col gap-6 p-8">
      <div>
        <p className="text-muted-foreground mb-1 text-xs">Monospace - 16px</p>
        <p className="text-muted-foreground font-mono text-[length:var(--paragraph-regular-size)] leading-[var(--paragraph-regular-line-height)] font-normal tracking-[0px]">
          const hello = &quot;world&quot;;
        </p>
      </div>
      <div>
        <p className="text-muted-foreground mb-1 text-xs">Code Block Example</p>
        <pre className="bg-muted rounded-md p-4 font-mono text-sm">
          {`function example() {
  return "Hello, World!";
}`}
        </pre>
      </div>
      <div>
        <p className="text-muted-foreground mb-1 text-xs">Inline Code Example</p>
        <p className="text-muted-foreground">
          Use the{' '}
          <code className="bg-muted rounded px-1 py-0.5 font-mono text-sm">npm install</code>{' '}
          command to install packages.
        </p>
      </div>
    </div>
  ),
};
