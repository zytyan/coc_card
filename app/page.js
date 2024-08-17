"use client";
import {Avatar, Grid, Paper, Stack, TextField} from "@mui/material";
import {FastCharacterAttr} from "@/components/FastCharaterAttr";
import {Character} from "@/datastructor/Character";
import {testDefaultCharacterAttributes} from "@/datastructor/CharacterAttribute";
import {CharacterSheet} from "@/components/CharacterSheet";
import {BattleMonitor} from "@/components/BattleMonitor";
import {History} from "@/components/History";

const SearchBar = () => (
    <Paper sx={{p: 2}}>
        <TextField/>
    </Paper>
)


export default function Home() {
    return (
        <div className="App">
            <Grid container spacing={2} columns={3}>
                <Grid item xs={1} key={1}>
                    <SearchBar/>
                    <FastCharacterAttr characters={
                        [
                            new Character("base10", testDefaultCharacterAttributes(10)),
                            new Character("base30", testDefaultCharacterAttributes(30)),
                            new Character("base50", testDefaultCharacterAttributes(50)),
                            new Character("base70", testDefaultCharacterAttributes(70)),
                            new Character("base90", testDefaultCharacterAttributes(90)),
                        ]
                    }/>
                </Grid>
                <Grid item xs={1} key={2}>
                    <CharacterSheet/>
                </Grid>
                <Grid item xs={1} key={3}>
                    <Stack  spacing={2}>
                        <BattleMonitor/>
                        <History/>
                    </Stack>
                </Grid>
            </Grid>
        </div>
    );
}
