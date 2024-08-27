"use client";

import React from "react";
import {Grid, Paper} from "@mui/material";
import {FastCharacterAttr} from "@/components/FastCharaterAttr";
import {Character} from "@/datastructor/Character";
import {testDefaultCharacterAttributes} from "@/datastructor/CharacterAttribute";

import Draggable from 'react-draggable';

function ModuleSheet() {
    return (

        <Grid container spacing={2} column={3} style={{fontSize: 10, padding: '16px', display: ' flex'}}>
            <Grid item xs={2} key={1}>
                <DraggableFastCharacterAttr/>
            </Grid>
        </Grid>
    )
}

function DraggableFastCharacterAttr() {
    return (
        <Draggable handle=".draggable-handle">
            <Paper style={{display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '16px'}}>
                <div className="draggable-handle" style={{cursor: 'move', display: 'grid',}}>
                    <FastCharacterAttr
                        characters={[
                            new Character("狐狸", testDefaultCharacterAttributes()),
                            new Character("狐狸", testDefaultCharacterAttributes()),
                        ]}
                    />
                </div>
            </Paper>
        </Draggable>
    )
}

export default ModuleSheet;