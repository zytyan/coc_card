import React from 'react';
import Drawer from '@mui/material/Drawer';
import NavPaper from './NavComponents/NavPaper'
import IconButton from '@mui/material/IconButton';
import SpaceDashboardRounded from '@mui/icons-material/SpaceDashboardRounded';
import Box from '@mui/material/Box';

interface CustomDrawerProps {
    width?: number;
    open: boolean;
    onClose: () => void;
    buttons: {
        label: string;
        onClick: () => void;
    }[];
}

const CustomDrawer: React.FC<CustomDrawerProps> = ({width = 240, open, onClose, buttons}) => {
    return (
        <Drawer variant="persistent" anchor="left" open={open} onClose={onClose} sx={{width, flexShrink: 0}}>
            <Box style={{display: 'flex', justifyContent: 'flex-start', padding: '8px',}}>
                <IconButton onClick={onClose}>
                    <SpaceDashboardRounded/>
                </IconButton>
            </Box>
            <NavPaper buttons={buttons}/>
        </Drawer>
    );
};

export default CustomDrawer;
