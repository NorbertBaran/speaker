import {Box, Button, Container, FormControl, InputLabel, MenuItem, Select, TextField, Typography, useTheme} from "@mui/material";
import {Header as HeaderTemplate} from "@norbertbaran/react-components"
import {useEffect, useState} from "react";
import {Campaign, Download} from "@mui/icons-material";
import { API } from "../config/config";


const Home = () => {
    const theme = useTheme()
    const contrastTheme = theme.palette.secondary.contrastText

    const [phrase, setPhrase] = useState('')
    const [quota, setQuota] = useState(10000)
    const [voice, setVoice] = useState('en-US-Neural2-J')
    const [speech, setSpeech] = useState('')

    const getQuota = () => {
        fetch(`${API}/quota`, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(response => response.json())
            .then(data => setQuota(data['transfer']));
    }
    const createSpeech = (phrase: string) => {
        if (phrase.length < 250)
            fetch(`${API}/speech`, {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    voice: voice,
                    content: phrase
                })
            }).then(response => response.blob())
                .then(blob => setSpeech(URL.createObjectURL(blob)))
        getQuota()
    }
    const downloadSpeech = () => {
        console.log(speech)
        const link = document.createElement("a");
        link.download = 'speech.mp3';
        link.href = speech;
        link.click();
    }

    useEffect(() => getQuota(), [])

    return (
        <Container maxWidth='lg'>
            <Box margin={6} boxShadow='0px 0px 5px 0px #ddd' border='1px solid' borderColor='#c0c0c0' borderRadius={1}
                 padding={5} display='flex' flexDirection='column' gap={2}>
                <HeaderTemplate label='Speech Synthesis'/>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Voice</InputLabel>
                    <Select
                        value={voice}
                        label='Voice'
                        onChange={e => setVoice(e.target.value)}
                    >
                        <MenuItem value='en-GB-Standard-D'>en-GB-Standard-D</MenuItem>
                        <MenuItem value='en-US-Neural2-J'>en-US-Neural2-J</MenuItem>
                    </Select>
                </FormControl>
                <TextField error={phrase.length > 250} label="Type or paste text here" multiline minRows={15}
                           onChange={e => setPhrase(e.target.value)}/>
                <Box paddingX={2} display='flex' justifyContent='space-between'>
                    <Typography display='inline' variant='subtitle2' fontWeight={300} color={contrastTheme}>
                        {phrase.length} / 250
                    </Typography>
                    <Typography display='inline' variant='subtitle2' fontWeight={300} color={contrastTheme}>
                        Total quota remaining: {quota}
                    </Typography>
                </Box>
                <Button disabled={phrase.length > 250} variant='contained' size='large' startIcon={<Campaign/>}
                        onClick={() => createSpeech(phrase)}>Create
                    speech</Button>
                <Box minHeight='45px' display='flex' justifyContent='center' alignItems='center'>
                    {speech ? <audio id="audio" controls src={speech}/> :
                        <Typography color={contrastTheme} sx={{opacity: 0.5}}>
                            Create speech before you download
                        </Typography>}
                </Box>
                <Button disabled={!speech} variant='contained' size='large' startIcon={<Download/>}
                        onClick={() => downloadSpeech()}>Download</Button>
            </Box>
        </Container>
    )
}

export default Home