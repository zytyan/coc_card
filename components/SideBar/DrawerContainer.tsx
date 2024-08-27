import React from "react";
import CustomDrawer from './CustomDrawer';
import {useRouter} from 'next/navigation';
import SpaceDashboardRounded from '@mui/icons-material/SpaceDashboardRounded';
import IconButton from "@mui/material/IconButton";
import Stack from '@mui/material/Stack';
import Box from "@mui/material/Box";

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
        {label: 'Battle Indicator', onClick: () => handleButtonClick('/BattleIndicator')},
        {label: 'Module Sheet', onClick: () => handleButtonClick('/ModuleSheet')},
    ];


    return (
        <Stack direction="row" spacing={2}>
            <Box style={{display: 'flex', justifyContent: 'flex-start', padding: '8px',}}>
                <IconButton onClick={handleDrawerOpen} >
                    <SpaceDashboardRounded/>
                </IconButton>
            </Box>
            <CustomDrawer open={drawerOpen} onClose={handleDrawerClose} buttons={buttons}/>
        </Stack>
    );
};

export default DrawerContainer;
