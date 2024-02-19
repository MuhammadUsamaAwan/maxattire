import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';

import { getBlogPosts, type BlogPosts } from '~/lib/fetchers/blog';
import { getFileUrl } from '~/lib/utils';
import { AspectRatio } from '~/components/ui/aspect-ratio';
import { Badge } from '~/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { PlaceholderImage } from '~/components/placeholder-image';

export default async function BlogPosts() {
  const posts = await getBlogPosts();

  return (
    <div className='container py-10'>
      <div className='mb-8 space-y-1'>
        <h1 className='text-3xl font-bold leading-tight tracking-tighter md:text-4xl lg:leading-[1.1]'>
          Discount Posts
        </h1>
        <p className='max-w-[750px] text-base text-muted-foreground sm:text-lg'>
          Get the best deals on your favorite products
        </p>
      </div>
      <div className='grid md:grid-cols-2 lg:grid-cols-3'>
        {posts?.map(post => <PostCard key={post.id} post={post} />)}
      </div>
    </div>
  );
}

type PostCardProps = {
  post: BlogPosts[number];
};

function PostCard({ post }: PostCardProps) {
  return (
    <Card className='overflow-hidden'>
      <CardHeader className='border-b p-0'>
        <Link href={`/blog/${post.slug}`}>
          <AspectRatio ratio={4 / 3}>
            {post.thumbnail ? (
              <Image src={getFileUrl(post.thumbnail)} alt={post.title} className='object-cover' fill loading='lazy' />
            ) : (
              <PlaceholderImage className='rounded-none' asChild />
            )}
          </AspectRatio>
        </Link>
      </CardHeader>
      <CardContent className='space-y-1.5 p-4'>
        <CardTitle className='line-clamp-1'>{post.title}</CardTitle>
        <div className='flex flex-wrap gap-2'>
          {post.tags?.split(',').map(tag => (
            <Badge key={tag} variant='outline' className='font-medium'>
              {tag}
            </Badge>
          ))}
        </div>
        <div className='text-sm text-muted-foreground'>
          {format(post.createdAt ? new Date(post.createdAt) : new Date(), 'dd MMM yy')}
        </div>
      </CardContent>
    </Card>
  );
}
