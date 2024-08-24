"use client";
import {Grid, Paper, Stack, TextField} from "@mui/material";
import {FastCharacterAttr} from "@/components/FastCharaterAttr";
import {Character} from "@/datastructor/Character";
import {testDefaultCharacterAttributes} from "@/datastructor/CharacterAttribute";
import {CharacterSheet} from "@/components/CharacterSheet";
import {BattleMonitor} from "@/components/BattleMonitor";
import {History} from "@/components/History";
import SideBar from "@/components/SideBar";
import {useState} from "react";

const SearchBar = () => (
    <Paper sx={{p: 2}}>
        <TextField/>
    </Paper>
)


export default function Home() {
    const [drawerOpen, setDrawerOpen] = useState(true);

    return (
        <div className="App">

            <SideBar drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen}/>
            <Grid container spacing={2} columns={3}
                sx={{ml: drawerOpen ? '240px' : '0px', transition: 'margin-left 0.3s'}}
            >
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
