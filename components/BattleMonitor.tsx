import React from 'react';
import {Avatar, Box, Button, Stack, Typography} from "@mui/material";

export const BattleMonitor = () => {
    return (
        <Stack>
            <Typography>第1轮</Typography>
            <Button variant={"contained"} color={"primary"}
            >下一回合</Button>
            <Stack direction={"row"} spacing={2}>
                <Avatar>1</Avatar>
                <Avatar>2</Avatar>
                <Avatar>3</Avatar>
                <Avatar>4</Avatar>
                <Avatar>5</Avatar>
                <Avatar>5</Avatar>
                <Avatar>5</Avatar>
                <Avatar>5</Avatar>
                <Avatar>5</Avatar>
                <Avatar>5</Avatar>
                <Avatar>5</Avatar>
                <Avatar>5</Avatar>
                <Avatar>5</Avatar>
            </Stack>
        </Stack>
    )
}