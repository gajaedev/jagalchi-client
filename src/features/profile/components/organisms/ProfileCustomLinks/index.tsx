'use client';

import { useEffect } from 'react';

import { useAtomValue } from 'jotai';
import { ArrowUpRight, Link as LinkIcon, Trash2 } from 'lucide-react';
import { useForm, useFieldArray } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PROFILE_MESSAGES } from '@/constants/messages';
import { sanitizeUrl } from '@/lib/url-validation';

import { profileModeAtom } from '../../../stores/profile-atoms';
import { ProfileLinkAddButton } from '../../atoms/ProfileLinkAddButton';

export interface LinkItem {
  id: string;
  name: string;
  url: string;
}

interface ProfileCustomLinksProps {
  initialLinks?: LinkItem[];
  onChange?: (links: LinkItem[]) => void;
}

export function ProfileCustomLinks({ initialLinks = [], onChange }: ProfileCustomLinksProps) {
  const mode = useAtomValue(profileModeAtom);

  const { control, register, reset, watch } = useForm({
    defaultValues: {
      links: initialLinks,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'links',
  });

  const links = watch('links');

  // Update form when props change
  useEffect(() => {
    reset({ links: initialLinks });
  }, [initialLinks, reset]);

  // Notify parent of changes
  useEffect(() => {
    onChange?.(links);
  }, [links, onChange]);

  const handleAddLink = () => {
    append({ id: crypto.randomUUID(), name: '', url: '' });
  };

  if (mode === 'edit') {
    return (
      <div className="flex w-full flex-col gap-2">
        {fields.map((field, index) => (
          <div key={field.id} className="flex w-full items-center gap-2">
            <div className="flex flex-1 gap-4">
              <Input
                className="w-[120px]"
                placeholder={PROFILE_MESSAGES.LINK_NAME_PLACEHOLDER}
                {...register(`links.${index}.name` as const)}
              />

              <div className="relative flex-1">
                <LinkIcon
                  size={16}
                  className="text-muted-foreground absolute top-1/2 left-3 -translate-y-1/2"
                />
                <Input
                  className="truncate pl-9"
                  placeholder="https://"
                  {...register(`links.${index}.url` as const)}
                />
              </div>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => remove(index)}
              className="text-muted-foreground hover:text-destructive h-8 w-8"
              title={PROFILE_MESSAGES.LINK_DELETE_TITLE}
            >
              <Trash2 size={16} />
            </Button>
          </div>
        ))}
        <ProfileLinkAddButton currentCount={fields.length} maxCount={5} onClick={handleAddLink} />
      </div>
    );
  }

  if (links.length === 0) return null;

  return (
    <div className="flex w-full flex-col gap-2">
      {links.map((link, index) => (
        <a
          key={link.id || index}
          href={sanitizeUrl(link.url)}
          target="_blank"
          rel="noopener noreferrer"
          className="border-border hover:bg-accent flex h-[54px] items-center gap-4 rounded-md border px-4 transition-colors"
        >
          <ArrowUpRight size={16} className="text-muted-foreground" />
          {link.name && <span className="text-foreground text-sm font-medium">{link.name}</span>}
          <span className="text-muted-foreground w-[224px] truncate text-sm underline">
            {link.url}
          </span>
        </a>
      ))}
    </div>
  );
}
