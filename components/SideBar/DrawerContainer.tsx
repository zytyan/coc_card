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

    const handleButtonClickCharacterSheet = () => {
        void router.push('/CharacterSheet');
    };

    const handleButtonClickHome = () => {
        void router.push('/');
    };

    const buttons = [
        {label: 'Home', onClick: handleButtonClickHome},
        {label: 'Character Sheet', onClick: handleButtonClickCharacterSheet},
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
