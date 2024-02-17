import { uniqBy } from 'lodash';

import { getSizeChart } from '~/lib/fetchers/size-chart';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table';

type SizeChartProps = {
  slug: string;
};

export async function SizeChart({ slug }: SizeChartProps) {
  const sizeChart = await getSizeChart(slug);
  const sizeData: Record<
    string,
    {
      size: string;
      [key: string]: string | null;
    }
  > = {};
  sizeChart.forEach(item => {
    const { size, title, value } = item;
    if (!sizeData[size]) {
      sizeData[size] = { size };
    }
    // @ts-expect-error - we know that sizeData[size] exists
    sizeData[size][title] = value;
  });
  const sizeDataArray = Object.values(sizeData);
  const titles = uniqBy(sizeChart, 'title').map(item => item.title);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className='text-center'>Size</TableHead>
          {titles.map(title => (
            <TableHead key={title} className='text-center'>
              {title}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {sizeDataArray.map((v, i) => (
          <TableRow key={i}>
            <TableCell className='text-center'>{v.size}</TableCell>
            {titles.map(title => (
              <TableCell key={title} className='text-center'>
                {v[title] || '-'}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
