'use client';

import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

type Column<T> = {
  key: keyof T | string;
  header: string;
  className?: string;
  render?: (row: T) => React.ReactNode;
};

export function DataTable<T extends Record<string, any>>({
  title,
  searchPlaceholder = 'Search...',
  columns,
  data,
  searchKeys = [],
}: {
  title?: string;
  searchPlaceholder?: string;
  columns: Column<T>[];
  data: T[];
  searchKeys?: (keyof T)[];
}) {
  const [query, setQuery] = useState('');

  const filteredData = useMemo(() => {
    if (!query.trim() || searchKeys.length === 0) return data;
    const lower = query.toLowerCase();
    return data.filter((row) =>
      searchKeys.some((key) => String(row[key] ?? '').toLowerCase().includes(lower)),
    );
  }, [data, query, searchKeys]);

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        {title ? <h3 className="font-heading text-lg font-semibold">{title}</h3> : <div />}
        <div className="relative w-full md:max-w-xs">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={searchPlaceholder}
            className="h-10 rounded-xl border-slate-200 bg-white pl-9 text-sm dark:border-slate-800 dark:bg-slate-950"
          />
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50 dark:bg-slate-900">
              {columns.map((column) => (
                <TableHead key={String(column.key)} className={column.className}>{column.header}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.length ? (
              filteredData.map((row, index) => (
                <TableRow key={row.id ?? index} className="bg-white transition hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-800/60">
                  {columns.map((column) => (
                    <TableCell key={String(column.key)} className={column.className}>
                      {column.render ? column.render(row) : String(row[column.key as keyof T] ?? '-')}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow className="bg-white dark:bg-slate-900">
                <TableCell colSpan={columns.length} className="py-10 text-center text-sm text-slate-500 dark:text-slate-400">
                  No data found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
