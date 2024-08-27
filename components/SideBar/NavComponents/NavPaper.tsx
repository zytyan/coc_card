import React from 'react';
import Paper from '@mui/material/Paper';
import NavButtonList from './NavButtonList';

interface NavPaperProps {
    buttons: {
        label: string;
        onClick: () => void;
    }[];
}

const NavPaper: React.FC<NavPaperProps> = ({buttons}) => {
    return (
        <Paper sx={{height: '100vh', }}>
            <NavButtonList buttons={buttons}/>
        </Paper>
    );
};

export default NavPaper;
