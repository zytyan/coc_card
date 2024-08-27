"use client";
import React, { useState } from 'react';
import {
    Paper,
    Typography,
    Grid,
    Box,
    Divider,
    TextField,
    FormControlLabel,
    Switch,
} from '@mui/material';

import {
    testDefaultCharacterAttributes,
    BaseInformation,
    BaseAttribute,
    DerivedAttribute,
    Skill
} from "@/datastructor/CharacterAttribute";

import SideBar from "@/components/SideBar";

const AttributeField = ({ rawAttr, editMode, onChange }) => (
    <Grid item xs={6}>
        {editMode ? (
            <TextField
                id={rawAttr.name}
                label={rawAttr.name}
                value={rawAttr.value}
                onChange={(e) => onChange(rawAttr, e.target.value)}
                fullWidth
            />
        ) : (
            <Typography>{rawAttr.name}: {rawAttr.value}</Typography>
        )}
    </Grid>
);

const attributes = testDefaultCharacterAttributes();

function CharacterCard() {
    const [editMode, setEditMode] = useState(false);

    const handleAttrChange = (attr, newValue) => {
        attr.value = newValue;
    };

    const renderAttributeSection = (title, attrs) => (
        <Box sx={{ padding: 2, marginBottom: 2 }}>
            <Typography variant="h6">{title}</Typography>
            <Divider sx={{ marginY: 1 }} />
            <Grid container spacing={2}>
                {attrs.map((attr, index) => (
                    <AttributeField
                        key={index}
                        rawAttr={attr}
                        editMode={editMode}
                        onChange={handleAttrChange}
                    />
                ))}
            </Grid>
        </Box>
    );

    // 根据类型过滤属性
    const playerInfo = attributes.filter(attr => attr instanceof BaseInformation);
    const baseAttributes = attributes.filter(attr => attr instanceof BaseAttribute);
    const derivedAttributes = attributes.filter(attr => attr instanceof DerivedAttribute);
    const skills = attributes.filter(attr => attr instanceof Skill);
    const belongings = attributes.filter(attr => attr instanceof BaseInformation && attr.name.includes('PersonalBelongings'));
    const background = attributes.filter(attr => attr instanceof BaseInformation && attr.name.includes('Background'));

    return (
        <Box>
            <Paper>
                <FormControlLabel
                    control={
                        <Switch checked={editMode} onChange={(e) => setEditMode(e.target.checked)} />
                    }
                    label="修改模式"
                />
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
