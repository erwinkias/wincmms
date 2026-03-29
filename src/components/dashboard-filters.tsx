'use client';

import { useState } from 'react';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const plantOptions = [
  { value: 'all', label: 'All Plant' },
  { value: 'main', label: 'Main Plant' },
  { value: 'warehouse', label: 'Warehouse' },
  { value: 'utility', label: 'Utility Area' },
];

export function DashboardFilters() {
  const [plant, setPlant] = useState(plantOptions[0]);
  const [month, setMonth] = useState(new Date(2026, 2, 1));

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="min-w-[250px] rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <Select
          instanceId="plant-select"
          options={plantOptions}
          value={plant}
          onChange={(value) => setPlant(value ?? plantOptions[0])}
          isSearchable
          placeholder="Select plant"
          styles={{
            control: (base) => ({ ...base, border: 'none', boxShadow: 'none', minHeight: '46px', background: 'transparent' }),
            menu: (base) => ({ ...base, zIndex: 50 }),
            indicatorSeparator: () => ({ display: 'none' }),
            valueContainer: (base) => ({ ...base, padding: '0 14px' }),
            input: (base) => ({ ...base, color: '#0f172a' }),
            singleValue: (base) => ({ ...base, color: '#0f172a', fontWeight: 500 }),
          }}
          className="text-sm dark:text-white"
          classNamePrefix="plant-select"
        />
      </div>

      <div className="rounded-xl border border-slate-200 bg-white px-4 py-[7px] shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <DatePicker
          selected={month}
          onChange={(date: Date | null) => setMonth(date ?? new Date())}
          dateFormat="MMMM yyyy"
          showMonthYearPicker
          className="w-[170px] bg-transparent text-sm font-medium text-slate-700 outline-none dark:text-slate-200"
        />
      </div>
    </div>
  );
}
