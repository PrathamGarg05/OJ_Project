import { Listbox, ListboxButton, ListboxOption, ListboxOptions, Transition } from '@headlessui/react'
import { FaCheck, FaChevronDown } from "react-icons/fa";
import clsx from "clsx";
import { Fragment } from "react";
import { languagesMap } from '../../utils/constants';

function LanguageSelector({ selected, onChange }) {

    const languages = languagesMap;

    return(
        <div className="w-48">
            <Listbox value={selected} onChange={onChange}>
                <div className="relative mt-1">
                    <ListboxButton className="relative w-full cursor-pointer rounded-lg bg-gray-100 dark:bg-gray-800 py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm">
                        <span className="block truncate">{selected.name}</span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <FaChevronDown className="h-4 w-4 text-gray-500" />
                        </span>
                    </ListboxButton>
                    <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                        <ListboxOptions className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-gray-800 py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none text-sm z-50">
                            {languages.map((lang, index) => (
                            <ListboxOption
                            key={index}
                            className={({ active }) =>
                                clsx(
                                active ? 'bg-blue-100 dark:bg-blue-600 dark:text-white' : '',
                                'relative cursor-pointer select-none py-2 pl-10 pr-4'
                                )
                            }
                            value={lang}
                            >
                            {({ selected }) => (
                                <>
                                <span className={clsx(selected ? 'font-medium' : 'font-normal', 'block truncate')}>
                                    {lang.name}
                                </span>
                                {selected ? (
                                    <span className="absolute left-2 inset-y-0 flex items-center">
                                    <FaCheck className="h-4 w-4 text-blue-500 dark:text-blue-300" />
                                    </span>
                                ) : null}
                                </>
                            )}
                            </ListboxOption>
                        ))}
                        </ListboxOptions>
                    </Transition>
                        
                </div>
                
            </Listbox>
        </div>
    )
}

export default LanguageSelector;