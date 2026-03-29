'use client';

import { useMemo } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const plantOptions = [
  { value: 'all', label: 'All Plant' },
  { value: 'main-plant', label: 'Main Plant' },
  { value: 'warehouse', label: 'Warehouse' },
  { value: 'utility-area', label: 'Utility Area' },
];

function monthToDate(value: string | null) {
  if (!value) return new Date(2026, 2, 1);
  const [year, month] = value.split('-').map(Number);
  return new Date(year, (month || 1) - 1, 1);
}

function dateToMonth(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  return `${year}-${month}`;
}

export function DashboardFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const plant = searchParams.get('plant') ?? 'all';
  const month = searchParams.get('month');

  const selectedPlant = useMemo(
    () => plantOptions.find((item) => item.value === plant) ?? plantOptions[0],
    [plant],
  );

  const selectedMonth = useMemo(() => monthToDate(month), [month]);

  const updateParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value);
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="min-w-[270px] rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <Select
          instanceId="plant-select"
          options={plantOptions}
          value={selectedPlant}
          onChange={(value) => updateParam('plant', value?.value ?? 'all')}
          isSearchable
          placeholder="Select plant"
          styles={{
            control: (base, state) => ({
              ...base,
              border: 'none',
              boxShadow: 'none',
              minHeight: '46px',
              background: 'transparent',
            }),
            menu: (base) => ({ ...base, zIndex: 50, borderRadius: 14, overflow: 'hidden' }),
            menuList: (base) => ({ ...base, padding: 8 }),
            option: (base, state) => ({
              ...base,
              borderRadius: 10,
              marginBottom: 4,
              backgroundColor: state.isSelected ? '#0f172a' : state.isFocused ? '#f1f5f9' : 'transparent',
              color: state.isSelected ? '#ffffff' : '#0f172a',
              cursor: 'pointer',
            }),
            indicatorSeparator: () => ({ display: 'none' }),
            dropdownIndicator: (base) => ({ ...base, color: '#64748b' }),
            placeholder: (base) => ({ ...base, color: '#94a3b8' }),
            valueContainer: (base) => ({ ...base, padding: '0 14px' }),
            input: (base) => ({ ...base, color: '#0f172a' }),
            singleValue: (base) => ({ ...base, color: '#0f172a', fontWeight: 500 }),
          }}
          className="text-sm"
          classNamePrefix="plant-select"
        />
      </div>

      <div className="rounded-xl border border-slate-200 bg-white px-4 py-[7px] shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <DatePicker
          selected={selectedMonth}
          onChange={(date: Date | null) => updateParam('month', dateToMonth(date ?? new Date()))}
          dateFormat="MMMM yyyy"
          showMonthYearPicker
          popperClassName="!z-50"
          className="w-[170px] bg-transparent text-sm font-medium text-slate-700 outline-none dark:text-slate-200"
        />
      </div>
    </div>
  );
}
