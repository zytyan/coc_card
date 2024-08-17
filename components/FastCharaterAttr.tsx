"use client";
import {useState} from "react";
import {Container, Grid, Paper, Stack, ToggleButton, ToggleButtonGroup, Typography} from "@mui/material";
import {Avatar} from "@mui/material";
import React from "react";
import {CharacterAttribute} from "@/datastructor/CharacterAttribute";
import {Character} from "@/datastructor/Character";

const FastCharacterAttrBox = ({avatar, attr, key}) => {
    return (
        <Grid item xs={1} key={key}>
            <Stack
                spacing={0}
                alignItems="center" // 水平居中
            >
                <Avatar>{avatar}</Avatar>
                <p>{attr}</p>

            </Stack>
        </Grid>

    )
}
const FastAttrSelectBtn = ({name, setAttrKey, selectedComp, setSelectedComp}) => {

    return (
        <Grid item xs={1} key={name}>
            <ToggleButton value={name}
                          color="primary"
                          selected={selectedComp === name}
                          onClick={() => {
                              // change selected attr
                              setSelectedComp(name)

                              setAttrKey(name)
                          }}>
                {name}
            </ToggleButton>
        </Grid>
    )
}
export const FastCharacterAttr = ({characters}) => {
    "use client";
    const [attrKey, setAttrKey] = useState('STR');
    const [selectedComp, setSelectedComp] = useState('STR');
    return (
        <Stack
            spacing={2}
            alignItems="center" // 水平居中
        >
            <Typography>快速属性： {attrKey}</Typography>
            <Grid container spacing={2} columns={4}>
                {characters.map((character, index) => {
                    console.log("ststajlksdfj");
                    return (<FastCharacterAttrBox avatar={index} attr={character?.attributes[attrKey]?.value ?? "nan"} key={index}/>);
                })}
            </Grid>


            <Grid container spacing={2} columns={4}>
                <FastAttrSelectBtn name={"STR"} setAttrKey={setAttrKey} selectedComp={selectedComp}
                                   setSelectedComp={setSelectedComp}/>
                <FastAttrSelectBtn name={"DEX"} setAttrKey={setAttrKey} selectedComp={selectedComp}
                                   setSelectedComp={setSelectedComp}/>
                <FastAttrSelectBtn name={"INT"} setAttrKey={setAttrKey} selectedComp={selectedComp}
                                   setSelectedComp={setSelectedComp}/>
                <FastAttrSelectBtn name={"TEST4"} setAttrKey={setAttrKey} selectedComp={selectedComp}
                                   setSelectedComp={setSelectedComp}/>
                <FastAttrSelectBtn name={"TEST5"} setAttrKey={setAttrKey} selectedComp={selectedComp}
                                   setSelectedComp={setSelectedComp}/>
                <FastAttrSelectBtn name={"TEST1"} setAttrKey={setAttrKey} selectedComp={selectedComp}
                                   setSelectedComp={setSelectedComp}/>
                <FastAttrSelectBtn name={"TEST1"} setAttrKey={setAttrKey} selectedComp={selectedComp}
                                   setSelectedComp={setSelectedComp}/>
            </Grid>

        </Stack>
    )
}