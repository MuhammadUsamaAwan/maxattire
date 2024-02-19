import Image from 'next/image';
import { notFound } from 'next/navigation';
import { format } from 'date-fns';

import { getBlogPost } from '~/lib/fetchers/blog';
import { getInitials } from '~/lib/utils';
import { AspectRatio } from '~/components/ui/aspect-ratio';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { Badge } from '~/components/ui/badge';

type BlogPostProps = {
  params: {
    postSlug: string;
  };
};

export default async function BlogPost({ params: { postSlug } }: BlogPostProps) {
  const post = await getBlogPost(postSlug);

  if (!post) {
    notFound();
  }

  return (
    <div className='container py-10'>
      <div className='space-y-2'>
        <div className='text-sm text-muted-foreground'>
          {format(post.createdAt ? new Date(post.createdAt) : new Date(), 'dd MMM yy')}
        </div>
        <h1 className='inline-block text-4xl font-bold leading-tight lg:text-5xl'>{post.title}</h1>
        <div className='flex items-center space-x-4'>
          <Avatar className='size-11'>
            <AvatarImage src={post.author?.image ?? ''} alt={post.author?.name ?? ''} />
            <AvatarFallback>{getInitials(post.author?.name)}</AvatarFallback>
          </Avatar>
        </div>
        <div className='flex flex-wrap gap-2'>
          {post.tags?.split(',').map(tag => (
            <Badge key={tag} variant='outline'>
              {tag}
            </Badge>
          ))}
        </div>
        <AspectRatio ratio={16 / 9}>
          <Image src={post.thumbnail ?? ''} alt={post.title} fill className='rounded-md border bg-muted' priority />
        </AspectRatio>
      </div>
      <div className='py-10'>
        <div
          className='prose break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0'
          dangerouslySetInnerHTML={{
            __html: post.description ?? 'No content available for this page.',
          }}
        />
      </div>
    </div>
  );
}
