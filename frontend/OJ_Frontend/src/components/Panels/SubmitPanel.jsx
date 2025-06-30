import { Button } from "@headlessui/react";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

function SubmitPanel() {

    const {user} = useContext(AuthContext);
    function onClick() {
        console.log(user);
    }

    return(
        <div className="h-full w-full bg-white dark:bg-gray-900 text-black dark:text-white overflow-y-auto rounded-md">
            <TabGroup>
                <TabList className="flex space-x-4 border-b border-gray-300 dark:border-gray-700 dark:bg-black pb-1 gap-0.5 bg-gray-100 items-center">
                    <Button 
                        className="px-4 py-2 text-sm dark:bg-gray-950 text-green-600 rounded-md shadow-lg hover:bg-gray-900"
                        onClick={onClick}
                        disabled={!user}
                    >
                        Submit
                    </Button>
                </TabList>

            </TabGroup>
            {user ? null : <span className="text-sm">Please login to submit</span>}
        </div>
    )
}

export default SubmitPanel;