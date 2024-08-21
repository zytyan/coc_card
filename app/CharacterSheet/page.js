import React from 'react';
import { Paper, Typography, Grid, Box, Divider } from '@mui/material';
import {testDefaultCharacterAttributes, BaseInformation, BaseAttribute, DerivedAttribute, Skill} from "@/datastructor/CharacterAttribute";

function CharacterCard() {
    const attributes = testDefaultCharacterAttributes();

    // Function to render a section of character attributes
    const renderAttributeSection = (title, attrs) => (
        <Box sx={{ padding: 2, marginBottom: 2 }}>
            <Typography variant="h6">{title}</Typography>
            <Divider sx={{ marginY: 1 }} />
            <Grid container spacing={2}>
                {attrs.map((attr, index) => (
                    <Grid item xs={6} key={index}>
                        <Typography>{attr.name}: {attr.value}</Typography>
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

    return (
        <Paper sx={{ padding: 4 }}>
            {/* Render different sections of the character card */}
            {renderAttributeSection('Player Information', playerInfo)}
            {renderAttributeSection('Base Attributes', baseAttributes)}
            {renderAttributeSection('Derived Attributes', derivedAttributes)}
            {renderAttributeSection('Skills', skills)}
            {renderAttributeSection('Belongings', belongings)}
            {renderAttributeSection('Background', background)}
        </Paper>
    );
}

export default CharacterCard;
