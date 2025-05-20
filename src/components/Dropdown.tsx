import { cn, HighlightedOption } from '@/lib/utils';
import { useEffect, useMemo, useRef, useState } from 'react';

export type DropdownItem = { id: string };

// interface IProps<T extends DropdownItem> {
//   className?: string;
//   list: T[];
//   itemKey: keyof T;
//   filterBy?: (keyof T)[];
//   placeholder?: string;
//   noDataPlaceholder?: string;
//   selection?: T;
//   multipe?: boolean
//   onSelect: (selected?: T) => void;
//   valueChange: (filteredItems: T[]) => void;
// }

interface IPropsSingle<T extends DropdownItem> {
  multiple?: false;
  selection?: T;
  valueChange: (selected?: T) => void;
}

interface IPropsMulti<T extends DropdownItem> {
  multiple: true;
  selection?: T[];
  valueChange: (filteredItems?: T[]) => void;
}

type ICommonProps<T extends DropdownItem> = {
  className?: string;
  list: T[];
  itemKey: keyof T;
  filterBy?: (keyof T)[];
  placeholder?: string;
  noDataPlaceholder?: string;
};

type IProps<T extends DropdownItem> = ICommonProps<T> &
  (IPropsSingle<T> | IPropsMulti<T>);

const Dropdown = <T extends DropdownItem>({
  className,
  list,
  placeholder = 'Search...',
  itemKey,
  filterBy,
  selection,
  noDataPlaceholder = 'No results',
  multiple,
  valueChange,
}: IProps<T>) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const [openDropdown, setOpenDropdown] = useState(false);
  const [searchValue, setSearchValue] = useState<string>('');
  const [debouncedQuery, setDebouncedQuery] = useState<string>();

  const selectDescription = useMemo(() => {
    if (!multiple || !selection?.length) return '';

    return selection.length === 1
      ? `${selection.length} selected item`
      : `${selection.length} selected items`;
  }, [selection]);

  useEffect(() => {
    if (!selection || multiple) return;

    setSearchValue(String(selection[itemKey] || ''));
  }, [selection, multiple]);

  // Debounce
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchValue);
    }, 200); // delay in ms

    if (!searchValue.length && !multiple) valueChange(undefined);

    return () => {
      clearTimeout(handler);
    };
  }, [searchValue, multiple]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setOpenDropdown(false); // Close the dropdown
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const filteredList: T[] = useMemo(() => {
    if (!debouncedQuery) return list;

    const filteredList = list.filter((item) => {
      const keysToFilter = filterBy?.length ? filterBy : [itemKey];

      return keysToFilter.some((key) => {
        const value = item[key];
        return (
          value != null &&
          value.toString().toLowerCase().includes(debouncedQuery.toLowerCase())
        );
      });
    });

    /* FILTER ONLY ON ONE KEY */
    // const filteredList = list.filter((item) =>
    //   item[filterBy || itemKey]
    //     ?.toString()
    //     .toLowerCase()
    //     .includes(debouncedQuery.toLowerCase())
    // );
    return filteredList;
  }, [list, debouncedQuery]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOpenDropdown(!!e.target.value);
    setSearchValue(e.target.value?.toString());
  };

  const handleSelect = (item: T) => {
    if (multiple) return;

    setOpenDropdown(false);
    valueChange(item);
    setSearchValue(item[itemKey] ? String(item[itemKey]) : '');
  };

  const handleMultipeSelect = (item: T) => {
    if (!multiple) return;

    let updatedItems = [...(selection || [])];
    if (selection?.some((i) => i.id === item.id)) {
      updatedItems = selection.filter((s) => s.id !== item.id);
    } else {
      updatedItems = [...(selection || []), item];
    }
    valueChange(updatedItems);
  };

  const handleReset = () => {
    valueChange(undefined);
    setDebouncedQuery(undefined);
    setSearchValue('');
    setOpenDropdown(false);
  };

  return (
    <div className="flex flex-row gap-4">
      <div className={cn('w-64 relative', className)} ref={wrapperRef}>
        <input
          type="text"
          className="relative w-64 border-2 border-solid rounded-sm px-2 py-1"
          value={searchValue}
          placeholder={placeholder}
          onChange={handleSearch}
          onClick={(e) => {
            e.stopPropagation();
            setOpenDropdown(true);
          }}
        />
        {(!!searchValue.length || !!selection) && (
          <span
            className="absolute right-3 mt-[5px] cursor-pointer hover:text-indigo-500 dark:hover:text-rose-500"
            onClick={handleReset}
          >
            X
          </span>
        )}

        <div className="absolute z-2 w-full max-h-60 overflow-auto mb-2 rounded-sm mt-1 shadow-md">
          {openDropdown && filteredList.length > 0
            ? filteredList.map((item) => (
                <div
                  role="select"
                  key={item.id}
                  onClick={() =>
                    multiple ? handleMultipeSelect(item) : handleSelect(item)
                  }
                  className={cn(
                    'w-inherit bg-gray-200 dark:bg-gray-700 cursor-pointer hover:text-indigo-500 dark:hover:text-rose-500 p-1',
                    multiple && selection?.find((i) => i.id === item.id)
                      ? 'text-indigo-500 bg-gray-100 dark:text-rose-500 dark:bg-gray-600 font-semibold '
                      : ''
                  )}
                >
                  <HighlightedOption
                    name={item[itemKey]?.toString() || ''}
                    query={debouncedQuery}
                  />
                </div>
              ))
            : openDropdown && (
                <option
                  value=""
                  className="w-inherit bg-gray-200 text-gray-600 dark:text-gray-400 dark:bg-gray-700 p-1"
                >
                  {noDataPlaceholder}
                </option>
              )}
        </div>
      </div>
      <div className="description mt-2">
        {/* {!multiple && selection?.[itemKey]?.toString()}&nbsp; */}
        {selectDescription}
      </div>
    </div>
  );
};

export default Dropdown;
