import { colors, semanticColors } from '@/constants/colors';

import type { Meta, StoryObj } from '@storybook/react';

const ColorChip = ({
  name,
  value,
  large = false,
}: {
  name: string;
  value: string;
  large?: boolean;
}) => {
  return (
    <div className="flex flex-col gap-2">
      <div
        className={`rounded-lg shadow-sm ${large ? 'h-24' : 'h-16'}`}
        style={{ backgroundColor: value }}
      />
      <div className="flex flex-col gap-0.5">
        <p className="text-foreground font-mono text-xs font-medium">{name}</p>
        <p className="text-muted-foreground font-mono text-xs">{value}</p>
      </div>
    </div>
  );
};

const ColorPalette = ({ colorName }: { colorName: keyof typeof colors }) => {
  const palette = colors[colorName];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold capitalize">{colorName}</h3>
      <div className="grid grid-cols-11 gap-4">
        {Object.entries(palette).map(([scale, value]) => (
          <ColorChip key={`${colorName}-${scale}`} name={`${colorName}-${scale}`} value={value} />
        ))}
      </div>
    </div>
  );
};

const AllColorPalettes = () => {
  return (
    <div className="space-y-12 p-8">
      <div>
        <h1 className="mb-2 text-3xl font-bold">Color System</h1>
        <p className="text-muted-foreground">
          Complete color palette with 20 colors × 11 shades (50-950)
        </p>
      </div>

      {(Object.keys(colors) as Array<keyof typeof colors>).map((colorName) => (
        <ColorPalette key={colorName} colorName={colorName} />
      ))}
    </div>
  );
};

const SemanticColorShowcase = () => {
  return (
    <div className="space-y-8 p-8">
      <div>
        <h1 className="mb-2 text-3xl font-bold">Semantic Colors</h1>
        <p className="text-muted-foreground">
          Predefined colors for consistent error/success/warning/info states
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Error</h3>
          <div className="grid grid-cols-3 gap-4">
            <ColorChip name="error-light" value={semanticColors.error.light} large />
            <ColorChip name="error" value={semanticColors.error.DEFAULT} large />
            <ColorChip name="error-dark" value={semanticColors.error.dark} large />
          </div>
          <div className="rounded-lg border border-red-200 bg-red-50 p-4">
            <p className="text-sm font-medium text-red-800">This is an error message</p>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Success</h3>
          <div className="grid grid-cols-3 gap-4">
            <ColorChip name="success-light" value={semanticColors.success.light} large />
            <ColorChip name="success" value={semanticColors.success.DEFAULT} large />
            <ColorChip name="success-dark" value={semanticColors.success.dark} large />
          </div>
          <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4">
            <p className="text-sm font-medium text-emerald-800">This is a success message</p>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Warning</h3>
          <div className="grid grid-cols-3 gap-4">
            <ColorChip name="warning-light" value={semanticColors.warning.light} large />
            <ColorChip name="warning" value={semanticColors.warning.DEFAULT} large />
            <ColorChip name="warning-dark" value={semanticColors.warning.dark} large />
          </div>
          <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
            <p className="text-sm font-medium text-amber-800">This is a warning message</p>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Info</h3>
          <div className="grid grid-cols-3 gap-4">
            <ColorChip name="info-light" value={semanticColors.info.light} large />
            <ColorChip name="info" value={semanticColors.info.DEFAULT} large />
            <ColorChip name="info-dark" value={semanticColors.info.dark} large />
          </div>
          <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
            <p className="text-sm font-medium text-blue-800">This is an info message</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Neutral (Gray)</h3>
        <div className="grid grid-cols-11 gap-4">
          {Object.entries(semanticColors.neutral).map(([scale, value]) => (
            <ColorChip key={`neutral-${scale}`} name={scale} value={value} />
          ))}
        </div>
      </div>
    </div>
  );
};

const NeutralColors = () => {
  const neutralColors = ['gray', 'slate', 'zinc', 'stone'] as const;

  return (
    <div className="space-y-8 p-8">
      <div>
        <h1 className="mb-2 text-3xl font-bold">Neutral Colors</h1>
        <p className="text-muted-foreground">
          Gray scale variations for backgrounds, borders, and text
        </p>
      </div>

      {neutralColors.map((colorName) => (
        <ColorPalette key={colorName} colorName={colorName} />
      ))}
    </div>
  );
};

const BrandColors = () => {
  const brandColors = [
    'red',
    'orange',
    'amber',
    'yellow',
    'lime',
    'green',
    'emerald',
    'teal',
    'cyan',
    'sky',
    'blue',
    'indigo',
    'violet',
    'purple',
    'pink',
    'rose',
  ] as const;

  return (
    <div className="space-y-8 p-8">
      <div>
        <h1 className="mb-2 text-3xl font-bold">Brand Colors</h1>
        <p className="text-muted-foreground">Vibrant colors for accents, CTAs, and branding</p>
      </div>

      {brandColors.map((colorName) => (
        <ColorPalette key={colorName} colorName={colorName} />
      ))}
    </div>
  );
};

const UsageExamples = () => {
  return (
    <div className="space-y-8 p-8">
      <div>
        <h1 className="mb-2 text-3xl font-bold">Usage Examples</h1>
        <p className="text-muted-foreground">How to use colors in your components</p>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="mb-4 text-lg font-semibold">Import Colors</h3>
          <pre className="bg-muted rounded-lg p-4 font-mono text-sm">
            {`import { colors, semanticColors } from '@/constants/colors';

// Use specific color
const primaryColor = colors.blue[500]; // '#3B82F6'

// Use semantic color
const errorColor = semanticColors.error.DEFAULT; // '#EF4444'`}
          </pre>
        </div>

        <div>
          <h3 className="mb-4 text-lg font-semibold">In Tailwind (Arbitrary Values)</h3>
          <pre className="bg-muted rounded-lg p-4 font-mono text-sm">
            {`<div className="bg-[#3B82F6] text-white">
  Blue background
</div>

<div className="border border-[#EF4444]">
  Red border
</div>`}
          </pre>
        </div>

        <div>
          <h3 className="mb-4 text-lg font-semibold">Inline Styles</h3>
          <pre className="bg-muted rounded-lg p-4 font-mono text-sm">
            {`<div style={{ backgroundColor: colors.emerald[500] }}>
  Success background
</div>

<button style={{ color: semanticColors.error.DEFAULT }}>
  Error text
</button>`}
          </pre>
        </div>

        <div>
          <h3 className="mb-4 text-lg font-semibold">Visual Examples</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-3 rounded-lg border p-4">
              <p className="text-sm font-medium">Buttons</p>
              <div className="flex gap-2">
                <button
                  className="rounded-md px-4 py-2 text-sm font-medium text-white"
                  style={{ backgroundColor: colors.blue[500] }}
                >
                  Primary
                </button>
                <button
                  className="rounded-md px-4 py-2 text-sm font-medium text-white"
                  style={{ backgroundColor: colors.emerald[500] }}
                >
                  Success
                </button>
                <button
                  className="rounded-md px-4 py-2 text-sm font-medium text-white"
                  style={{ backgroundColor: colors.red[500] }}
                >
                  Danger
                </button>
              </div>
            </div>

            <div className="space-y-3 rounded-lg border p-4">
              <p className="text-sm font-medium">Badges</p>
              <div className="flex gap-2">
                <span
                  className="rounded-full px-3 py-1 text-xs font-medium"
                  style={{
                    backgroundColor: colors.blue[100],
                    color: colors.blue[700],
                  }}
                >
                  Info
                </span>
                <span
                  className="rounded-full px-3 py-1 text-xs font-medium"
                  style={{
                    backgroundColor: colors.emerald[100],
                    color: colors.emerald[700],
                  }}
                >
                  Success
                </span>
                <span
                  className="rounded-full px-3 py-1 text-xs font-medium"
                  style={{
                    backgroundColor: colors.amber[100],
                    color: colors.amber[700],
                  }}
                >
                  Warning
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const meta = {
  title: 'Design System/Colors',
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllColors: Story = {
  render: () => <AllColorPalettes />,
};

export const SemanticColors: Story = {
  render: () => <SemanticColorShowcase />,
};

export const Neutrals: Story = {
  render: () => <NeutralColors />,
};

export const Brand: Story = {
  render: () => <BrandColors />,
};

export const Usage: Story = {
  render: () => <UsageExamples />,
};
