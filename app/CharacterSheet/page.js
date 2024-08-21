"use client";
import React, {useEffect, useReducer, useRef, useState} from 'react';
import {Paper, Typography, Grid, Box, Divider, TextField, FormControlLabel, Switch} from '@mui/material';
import {
    testDefaultCharacterAttributes,
    BaseInformation,
    BaseAttribute,
    DerivedAttribute,
    Skill
} from "@/datastructor/CharacterAttribute";

const DisplayAttr = ({rawAttr}) => (
    <Grid item xs={6}>
        <Typography>{rawAttr.name}: {rawAttr.value}</Typography>
    </Grid>
);
let lastAttr = null;
const EditAttr = ({rawAttr}) => {
    const [, forceUpdate] = useReducer(x => x + 1, 0);
    const onChange = (e) => {
        lastAttr = rawAttr;
        rawAttr.value = e.target.value;
        forceUpdate()
    }
    return (
        <Grid item xs={6}>
            <TextField
                id={rawAttr.name}
                label={rawAttr.name}
                value={rawAttr.value}
                onChange={onChange}
            />
        </Grid>
    );
}
const attributes = testDefaultCharacterAttributes();

function CharacterCard({}) {
    // Function to render a section of character attributes
    const renderAttributeSection = (title, attrs) => (
        <Box sx={{padding: 2, marginBottom: 2}}>
            <Typography variant="h6">{title}</Typography>
            <Divider sx={{marginY: 1}}/>
            <Grid container spacing={2}>
                {attrs.map((attr, index) => (
                    <Grid item xs={6} key={index}>
                        {editMode ? <EditAttr rawAttr={attr}/> : <DisplayAttr rawAttr={attr}/>}
                    </Grid>
                ))}
            </Grid>
        </Box>
    );

    // Filter attributes based on your requirements to render them in sections
    const playerInfo = attributes.filter(attr => attr instanceof BaseInformation);
    const baseAttributes = attributes.filter(attr => attr instanceof BaseAttribute);
    const derivedAttributes = attributes.filter(attr => attr instanceof DerivedAttribute);
    const skills = attributes.filter(attr => attr instanceof Skill);
    const belongings = attributes.filter(attr => attr instanceof BaseInformation && attr.name.includes('PersonalBelongings'));
    const background = attributes.filter(attr => attr instanceof BaseInformation && attr.name.includes('Background'));
    const [editMode, setEditMode] = useState(false);
    return (
        <Box>
            <FormControlLabel control={<Switch onChange={
                (e) => setEditMode(e.target.checked)
            }/>} label="修改模式"/>
            <Paper sx={{padding: 4}}>
                {/* Render different sections of the character card */}
                {renderAttributeSection('Player Information', playerInfo)}
                {renderAttributeSection('Base Attributes', baseAttributes)}
                {renderAttributeSection('Derived Attributes', derivedAttributes)}
                {renderAttributeSection('Skills', skills)}
                {renderAttributeSection('Belongings', belongings)}
                {renderAttributeSection('Background', background)}
            </Paper>
        </Box>
    );
}

export default CharacterCard;
