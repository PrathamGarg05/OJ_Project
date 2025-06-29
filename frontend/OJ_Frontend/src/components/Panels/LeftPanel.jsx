import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import { FaFileAlt, FaClock , FaFlask} from "react-icons/fa";
import clsx from 'clsx'
import ProblemTab from '../Tabs/ProbDescription';
import Submissions from '../Tabs/Submissions';
import SolutionTab from '../Tabs/SolutionTab';

function LeftPanel(){
    const tabs = [
        {name: "Description" ,icon: FaFileAlt },
        {name: "Submissions", icon: FaClock},
        {name: "Solutions", icon: FaFlask}
    ]
    return (
        <div className="h-full w-full bg-white dark:bg-gray-900 text-black dark:text-white overflow-y-auto m-1 rounded-md">
            <TabGroup>
                <TabList className="flex space-x-4 border-b border-gray-300 dark:border-gray-700 pb-2 gap-0.5 bg-gray-800 items-center">
                    {tabs.map((tab,idx) => {
                        const Icon = tab.icon;
                        return (
                            <Tab
                                key={idx}
                                className={({ selected , hover}) =>
                                    clsx(
                                        'flex items-center gap-1 px-2 py-1 text-sm font-medium m-1 rounded-md mb-0',
                                        selected
                                        ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
                                        : 'text-gray-500 hover:text-blue-500',
                                        hover
                                        ? 'bg-gray-800'
                                        : 'text-gray-500 hover:text-blue-500',
                                    )
                                    }
                            >
                                
                                    <Icon className="text-xs justify-center align-baseline h-full" />
                                    {tab.name}
                            </Tab>
                        )
                    })}
                </TabList>
                <TabPanels className="pt-4">
                    <TabPanel> <ProblemTab /> </TabPanel>
                    <TabPanel> <Submissions /> </TabPanel>
                    <TabPanel> <SolutionTab /> </TabPanel>
                </TabPanels>
            </TabGroup>            
        </div>
    )
}

export default LeftPanel;