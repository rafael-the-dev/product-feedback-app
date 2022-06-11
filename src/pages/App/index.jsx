/*import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { StylesProvider } from '@mui/styles';
import { AppContextProvider } from '../../context/AppContext';
import loadable from '@loadable/component';

const App = () => {
    const theme = createTheme();

    const HomePage = loadable(() => import(/* webpackChunkName: "HomeP/ '../Home'));
    //const RoadmapPage = loadable(() => import(/* webpackChunkName: "RoadmapPage"/ '../Roadmap'));
    //const NewFeedbackPage = loadable(() => import(/* webpackChunkName: "NewFeedbackPage"/ '../NewFeedback'));
    //onst FeedbackDetailsPage = loadable(() => import(/* webpackChunkName: "FeedbackDetailsPage/ '../FeedbackDetails'));

    return (
        <>
            <StylesProvider injectFirst>
                <ThemeProvider theme={theme}>
                    <AppContextProvider>
                        <Router>
                            <Routes>
                                <Route exact path="/feedbacks/:id" element={<FeedbackDetailsPage />} />
                                <Route exact path="/new-feedback" element={<NewFeedbackPage />} />
                                <Route exact path="/roadmap" element={<RoadmapPage />} />
                                <Route exact path="/" element={<HomePage />} />
                            </Routes>
                        </Router>
                    </AppContextProvider>
                </ThemeProvider>
            </StylesProvider>
        </>
    )
};

export default App;*/