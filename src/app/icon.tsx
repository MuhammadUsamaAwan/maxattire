import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      // TODO: Wait for next/og to support size
      // eslint-disable-next-line tailwindcss/enforces-shorthand
      <div tw='flex h-full w-full items-center justify-center rounded-sm bg-[#E1252F] text-base leading-8 text-black'>
        MA
      </div>
    ),
    {
      ...size,
    }
  );
}
