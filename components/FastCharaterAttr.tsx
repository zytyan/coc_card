"use client";
import {useState} from "react";
import {Container, Grid, Paper, Stack, ToggleButton, ToggleButtonGroup, Typography} from "@mui/material";
import {Avatar} from "@mui/material";
import React from "react";
import {Attribute} from "@/datastructor/CharacterAttribute";
import {Character} from "@/datastructor/Character";

const FastCharacterAttrBox = ({avatar, attr, keyId}) => {
    console.log(keyId,"key");
    return (
        <Grid item xs={1} key={keyId}>
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
            <Stack
                spacing={0}
                alignItems="center"
            >
                <ToggleButton value={name}
                              color="primary"
                              selected={selectedComp === name}
                              onClick={() => {
                                  setSelectedComp(name);
                                  setAttrKey(name);
                              }}
                              style={{
                                  minWidth: '60px',
                                  height: '40px',
                              }}
                >
                    {name}
                </ToggleButton>
            </Stack>
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
            <Grid container spacing={2} columns={3}>
                {characters.map((character, index) => {
                    console.log("ststajlksdfj");
                    return (<FastCharacterAttrBox avatar={index} attr={character?.attributes[attrKey]?.value ?? "nan"} keyId={index}/>);
                })}
            </Grid>


            <Grid container spacing={2} columns={3}>
                <FastAttrSelectBtn name={"STR"} setAttrKey={setAttrKey} selectedComp={selectedComp}
                                   setSelectedComp={setSelectedComp}/>
                <FastAttrSelectBtn name={"CON"} setAttrKey={setAttrKey} selectedComp={selectedComp}
                                   setSelectedComp={setSelectedComp}/>
                <FastAttrSelectBtn name={"SIZ"} setAttrKey={setAttrKey} selectedComp={setSelectedComp}
                                   setSelectedComp={setSelectedComp}/>
                <FastAttrSelectBtn name={"DEX"} setAttrKey={setAttrKey} selectedComp={setSelectedComp}
                                   setSelectedComp={setSelectedComp}/>
                <FastAttrSelectBtn name={"APP"} setAttrKey={setAttrKey} selectedComp={setSelectedComp}
                                   setSelectedComp={setSelectedComp}/>
                <FastAttrSelectBtn name={"INT/IDE"} setAttrKey={setAttrKey} selectedComp={setSelectedComp}
                                   setSelectedComp={setSelectedComp}/>
                <FastAttrSelectBtn name={"POW"} setAttrKey={setAttrKey} selectedComp={setSelectedComp}
                                   setSelectedComp={setSelectedComp}/>
                <FastAttrSelectBtn name={"EDU"} setAttrKey={setAttrKey} selectedComp={setSelectedComp}
                                   setSelectedComp={setSelectedComp}/>
                <FastAttrSelectBtn name={"MOV"} setAttrKey={setAttrKey} selectedComp={setSelectedComp}
                                   setSelectedComp={setSelectedComp}/>
                <FastAttrSelectBtn name={"HP"} setAttrKey={setAttrKey} selectedComp={setSelectedComp}
                                   setSelectedComp={setSelectedComp}/>
                <FastAttrSelectBtn name={"SAN"} setAttrKey={setAttrKey} selectedComp={setSelectedComp}
                                   setSelectedComp={setSelectedComp}/>
            </Grid>
        </Stack>
    )
}
