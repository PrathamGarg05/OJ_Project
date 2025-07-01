import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import { FaFileAlt, FaClock , FaFlask} from "react-icons/fa";
import clsx from 'clsx'
import ProblemTab from '../Tabs/ProbDescription';
import Submissions from '../Tabs/Submissions';
import SolutionTab from '../Tabs/SolutionTab';

function LeftPanel({problem}){
    const tabs = [
        {name: "Description" ,icon: FaFileAlt },
        {name: "Submissions", icon: FaClock},
        {name: "Solutions", icon: FaFlask}
    ]
    return (
        <div className="h-full w-full bg-white dark:bg-gray-900 text-black dark:text-white overflow-y-auto rounded-md">
            <TabGroup>
                <TabList className="flex space-x-4 border-b border-gray-300 dark:border-gray-700 dark:bg-gray-800 pb-1 gap-0.5 bg-gray-100 items-center">
                    {tabs.map((tab,idx) => {
                        const Icon = tab.icon;
                        const name = tab.name;
                        return (
                            <Tab
                                key={idx}
                                disabled={name == "Solutions"}
                                className={({ selected , hover, disabled}) =>
                                    clsx(
                                        'flex items-center gap-1 px-2 py-1.75 text-sm font-medium m-1 rounded-md mb-0',
                                        selected
                                        ? 'border-b-2 dark:border-blue-500 text-black dark:text-white'
                                        : 'text-gray-500',
                                        hover
                                        ? 'dark:bg-gray-700 bg-gray-200'
                                        : 'hover:text-blue-500',
                                        disabled
                                        ? 'cursor-not-allowed'
                                        : 'text-gray-500'
                                    )
                                    }
                            >
                                
                                    <Icon className="text-xs justify-center align-baseline h-full" />
                                    {tab.name}
                            </Tab>
                        )
                    })}
                </TabList>
                <div className="flex-1 overflow-y-auto pr-2 pb-6">
                    <TabPanels className="pt-2">
                        <TabPanel> <ProblemTab problem={problem}/> </TabPanel>
                        <TabPanel> <Submissions /> </TabPanel>
                        <TabPanel> <SolutionTab /> </TabPanel>
                    </TabPanels>
                </div>
                
            </TabGroup>            
        </div>
    )
}

export default LeftPanel;