import '../styles/App.css'
import { Typography, CssBaseline } from "@mui/material"

function LogIn(){
    return(
        <>
            <CssBaseline/>
            <section>
                <Typography variant="h1" gutterBottom color="primary">
                    Bienvenido al LogIn
                </Typography>
            </section>
        </>
    )
}

export default LogIn