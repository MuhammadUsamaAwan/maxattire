import Image from 'next/image';
import { notFound } from 'next/navigation';
import { format } from 'date-fns';

import { getBlogPost } from '~/lib/fetchers/blog';
import { getFileUrl, getInitials } from '~/lib/utils';
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
    <div className='container max-w-3xl py-10'>
      <div className='space-y-2'>
        <div className='text-sm text-muted-foreground'>
          {format(post.createdAt ? new Date(post.createdAt) : new Date(), 'dd MMM yy')}
        </div>
        <h1 className='inline-block text-3xl font-bold leading-tight lg:text-3xl'>{post.title}</h1>
        {post.author && (
          <div className='flex items-center space-x-4'>
            <Avatar className='size-11'>
              <AvatarImage src={post.author?.image ?? ''} alt={post.author?.name ?? ''} />
              <AvatarFallback>{getInitials(post.author?.name)}</AvatarFallback>
            </Avatar>
          </div>
        )}
        <div className='flex flex-wrap gap-2'>
          {post.tags?.split(',').map(tag => (
            <Badge key={tag} variant='outline' className='font-medium'>
              {tag}
            </Badge>
          ))}
        </div>
        <AspectRatio ratio={16 / 9} className='mt-2'>
          <Image
            src={getFileUrl(post.thumbnail)}
            alt={post.title}
            fill
            className='rounded-md border bg-muted'
            priority
          />
        </AspectRatio>
      </div>
      <div className='py-10'>
        <div
          className='prose max-w-full dark:prose-invert'
          dangerouslySetInnerHTML={{
            __html: post.description ?? 'No content available for this page.',
          }}
        />
      </div>
    </div>
  );
}
