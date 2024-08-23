"use client";
import {
    Avatar,
    Grid,
    Paper,
    Stack,
    TextField,
    Button,
    Drawer,
    List,
    ListItem,
    ListItemText,
    IconButton
} from "@mui/material";
import {Menu as MenuIcon, ChevronLeft as ChevronLeftIcon} from '@mui/icons-material';
import {FastCharacterAttr} from "@/components/FastCharaterAttr";
import {Character} from "@/datastructor/Character";
import {testDefaultCharacterAttributes} from "@/datastructor/CharacterAttribute";
import {CharacterSheet} from "@/components/CharacterSheet";
import {BattleMonitor} from "@/components/BattleMonitor";
import {History} from "@/components/History";
import {useRouter} from 'next/navigation';
import {useState} from "react";

const SearchBar = () => (
    <Paper sx={{p: 2}}>
        <TextField/>
    </Paper>
)


export default function Home() {
    const [drawerOpen, setDrawerOpen] = useState(false);

    const handleDrawerOpen = () => {
        setDrawerOpen(true);
    };

    const handleDrawerClose = () => {
        setDrawerOpen(false);
    };

    const router = useRouter();

    const handleButtonClickCharacterSheet = () => {
        router.push('/CharacterSheet');
    };
    const handleButtonClickHome = () => {
        router.push('/');
    };


    return (
        <div className="App">
            <IconButton onClick={handleDrawerOpen}>
                <MenuIcon/>
            </IconButton>
            <Drawer
                variant="persistent"
                anchor="left"
                open={drawerOpen}
                onClose={handleDrawerClose}
            >
                <div>
                    <IconButton onClick={handleDrawerClose}>
                        <ChevronLeftIcon/>
                    </IconButton>
                </div>
                <List>
                    <ListItem button>
                        <Button variant="contained" color="primary" onClick={handleButtonClickHome}>
                            主界面
                        </Button>
                    </ListItem>
                    <ListItem button>
                        <Button variant="contained" color="primary" onClick={handleButtonClickCharacterSheet}>
                            狐狸
                        </Button>
                    </ListItem>
                </List>
            </Drawer>

            <Grid container spacing={2} columns={3}
                  sx={{ml: drawerOpen ? '240px' : '0px', transition: 'margin-left 0.3s'}}>
                <Grid item xs={1} key={1}>
                    <SearchBar/>
                    <FastCharacterAttr characters={
                        [
                            new Character("狐狸", testDefaultCharacterAttributes()),
                            new Character("狐狸", testDefaultCharacterAttributes()),
                            new Character("狐狸", testDefaultCharacterAttributes()),
                        ]
                    }/>
                </Grid>
                <Grid item xs={1} key={2}>
                    <CharacterSheet/>
                </Grid>
                <Grid item xs={1} key={3}>
                    <Stack spacing={2}>
                        <BattleMonitor/>
                        <History/>
                    </Stack>
                </Grid>
            </Grid>
        </div>
    );
}
