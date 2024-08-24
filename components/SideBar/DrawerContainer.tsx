import React from "react";
import CustomDrawer from './CustomDrawer';
import {useRouter} from 'next/navigation';
import SpaceDashboardRounded from '@mui/icons-material/SpaceDashboardRounded';
import IconButton from "@mui/material/IconButton";


interface DrawerContainerProps {
    drawerOpen: boolean;
    setDrawerOpen: (open: boolean) => void;
}

const DrawerContainer: React.FC<DrawerContainerProps> = ({drawerOpen, setDrawerOpen}) => {
    const router = useRouter();

    const handleDrawerOpen = () => {
        setDrawerOpen(true);
    };

    const handleDrawerClose = () => {
        setDrawerOpen(false);
    };

    const handleButtonClick = (path: string) => {
        void router.push(path);
    };

    const buttons = [
        {label: 'Home', onClick: () => handleButtonClick('/')},
        {label: 'Character Sheet', onClick: () => handleButtonClick('/CharacterSheet')},
    ];


    return (
        <div>
            <div style={{display: 'flex', justifyContent: 'flex-start', padding: '8px'}}>
                <IconButton onClick={handleDrawerOpen}>
                    <SpaceDashboardRounded/>
                </IconButton>
            </div>
            <CustomDrawer open={drawerOpen} onClose={handleDrawerClose} buttons={buttons}/>
        </div>
    );
};

export default DrawerContainer;
