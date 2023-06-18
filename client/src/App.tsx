import {createTheme,
    ThemeProvider
} from "@mui/material";
import {indigo} from "@mui/material/colors";
import {
    Footer as FooterTemplate,
    Navbar as NavbarTemplate,
    Socialmedia as SocialmediaTemplate
} from "@norbertbaran/react-components";
import {Home} from "./views";

const App = () => {
    const theme = createTheme({
        palette: {
            primary: indigo,
            secondary: {main: '#fff', contrastText: '#757575'}
        },
    })

    return (
        <ThemeProvider theme={theme}>
            <NavbarTemplate title={{label: 'Speaker'}}/>
            <Home/>
            <SocialmediaTemplate/>
            <FooterTemplate title={{label: 'Speaker'}} content=' Speech Synthesis &#169; 2022'/>
        </ThemeProvider>
    )
}

export default App
