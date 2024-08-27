import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import NavButton from './NavButton';

interface NavButtonListProps {
    buttons: {
        label: string;
        onClick: () => void;
    }[];
}

const NavListItem = (label: string, onClick: () => void, key: number) => (
    <ListItem key={key}>
        <NavButton label={label} onClick={onClick}/>
    </ListItem>
);


const NavButtonList: React.FC<NavButtonListProps> = ({buttons}) => {
    return (
        <List>
            {buttons.map((button, index) => NavListItem(button.label, button.onClick, index))}
        </List>
    );
};

export default NavButtonList;
