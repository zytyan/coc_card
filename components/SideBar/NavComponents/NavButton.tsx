import React from 'react';
import Button from '@mui/material/Button';

interface NavButtonProps {
    label: string;
    onClick: () => void;
}

const NavButton: React.FC<NavButtonProps> = ({label, onClick}) => {
    return (
        <Button variant="contained" color="primary" onClick={onClick}>
            {label}
        </Button>
    );
};

export default NavButton;
