import React from 'react';
import Button from '@mui/material/Button';

interface NavButtonProps {
    label: string;
    onClick: () => void;
}

const NavButton: React.FC<NavButtonProps> = ({label, onClick}) => {
    return (
        <Button variant="text" sx={{color: 'black'}} onClick={onClick} style={{justifyContent: "left", width: '100%'}}>
            {label}
        </Button>
    );
};

export default NavButton;
