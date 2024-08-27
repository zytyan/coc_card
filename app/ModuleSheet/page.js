"use client"

import React from "react";
import {Grid, Paper} from "@mui/material";
import Draggable from "react-draggable";
import MarkdownReader from "@/components/MarkdownReader";
import {FastCharacterAttr} from "@/components/FastCharaterAttr";
import {Character} from "@/datastructor/Character";
import {testDefaultCharacterAttributes} from "@/datastructor/CharacterAttribute";

function ModuleSheet() {
    return (
        <Grid container spacing={2} column={3} style={{fontSize: 10, padding: '16px', display: 'flex'}}>
            <Grid item xs={10} key={1}>
                <Paper style={{padding: '16px'}}>
                    <MarkdownReader filePath="/Modules/死光/剧本.md"/>
                </Paper>
            </Grid>
            <Grid item xs={2} key={2}>
                <DraggableFastCharacterAttr/>
            </Grid>

        </Grid>
    );
}

function DraggableFastCharacterAttr() {
    return (
        <Draggable handle=".draggable-handle">
            <Paper style={{display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '16px'}}>
                <div className="draggable-handle" style={{cursor: 'move', display: 'grid'}}>
                    <FastCharacterAttr
                        characters={[
                            new Character("狐狸", testDefaultCharacterAttributes()),
                            new Character("狐狸", testDefaultCharacterAttributes()),
                        ]}
                    />
                </div>
            </Paper>
        </Draggable>
    );
}

export default ModuleSheet;
