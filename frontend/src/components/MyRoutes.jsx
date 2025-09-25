import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";

import BookDoctor from "../pages/Doctor/BookDoctor";
import ReadingExercise from "../pages/Stuttering/ReadingExercise";
import BreathingExercise from "../pages/Stuttering/BreathingExercise";
import Logout from "../pages/Account/Logout";
import MyProfilePage from "../pages/Account/MyProfilePage";
import AboutUs from "../pages/AboutUs/AboutUs";
import HomePageNew from "../pages/HomePage/HomePageNew";
import HomePageLogin from "../pages/HomePage/HomePageLogin";
import Signup from "../pages/Account/Signup";
import Login from "../pages/Account/Login";
import DoctorLogin from "../pages/Doctor/DoctorLogin";
import { GlobalVariableContext } from "../App";
import ProblemDropdown from "../pages/Account/ProblemDropdown";
import Question from "../pages/Account/Question";
import ForumsPage from "../pages/Forum/ForumsPage";
import AddForumForm from "../pages/Forum/AddForumForm";
import DailyQuest from "../pages/Other/DailyQuest";
import DailyQuestStuttering from "../pages/Other/DailyQuestStuttering";
import SpecificForumPage from "../pages/Forum/SpecificForumPage";
import ChatAI from "../pages/AI/ChatAI";
import DoctorList from "../pages/Doctor/DoctorList";
import Pricing from "../pages/Account/Pricing";
import Journal from "../pages/Other/Journal";
import Gratitude from "../pages/Other/Gratitude";
import Meditation from "../pages/Other/Meditation";
import ConfirmationADHD from "../pages/Account/ConfirmationADHD";
import MentalIllness from "../pages/Account/MentalIllness";
import DailyQuestSocialIsolation from "../pages/Other/DailyQuestSocialIsolation";
import DiaryPage from "../pages/Diary/DiaryPage";
import CheckPointsIsolation from "../pages/Other/CheckPointsIsolation";
import Fundraisings from "../pages/Fundraising/Fundraisings";
import AddFundraisingForm from "../pages/Fundraising/AddFundraisingForm";
import SpecificFundraisings from "../pages/Fundraising/SpecificFundraisings";
import AddSpecialistForm from "../pages/Doctor/AddSpecialistForm";



const MyRoutes = () => {

    let { token, setToken, majorProblem, setMajorProblem } = useContext(GlobalVariableContext)


    return (
        <div>
            <Routes>
                {
                    token ?
                        <>
                            <Route index element={<HomePageLogin></HomePageLogin>} />

                            <Route
                                path="forum"
                                element={<ForumsPage></ForumsPage>}
                            />
                            <Route
                                path="forums/:id"
                                element={<SpecificForumPage></SpecificForumPage>}
                            />
                            <Route
                                path="add-forum"
                                element={<AddForumForm />}
                            />
                            <Route
                                path="doctors/:id"
                                element={<BookDoctor />}
                            />
                            <Route
                                path="checkpoints"
                                element={<CheckPointsIsolation></CheckPointsIsolation>}>
                            </Route>
                            <Route
                                path="reading-exercise"
                                element={<ReadingExercise />}
                            />
                            <Route
                                path="meditation"
                                element={<Meditation />}
                            />
                            <Route
                                path="add-gratitude"
                                element={<Gratitude />}
                            />
                            <Route
                                path="breathing-exercise"
                                element={<BreathingExercise />}
                            />
                            <Route
                                path="my-diary"
                                element={<DiaryPage />}
                            />
                            <Route
                                path="logout"
                                element={<Logout />}
                            />
                            <Route
                                path="my-profile"
                                element={<MyProfilePage></MyProfilePage>}
                            />
                            {/* <Route
                                path="daily-quest"
                                element={<DailyQuest></DailyQuest>}
                            /> */}

                            {
                                majorProblem === "adhd" && (
                                    <Route
                                        path="daily-quest"
                                        element={<DailyQuest></DailyQuest>}
                                    />
                                )
                            }
                            {
                                majorProblem === "stuttering" && (
                                    <Route
                                        path="daily-quest"
                                        element={<DailyQuestStuttering></DailyQuestStuttering>}
                                    />
                                )
                            }
                            {
                                majorProblem === "mental-illness" && (
                                    <Route
                                        path="daily-quest"
                                        element={<DailyQuest></DailyQuest>}

                                    />
                                )
                            }
                            {
                                majorProblem === "social-isolation" && (
                                    <Route
                                        path="daily-quest"
                                        element={<DailyQuestSocialIsolation></DailyQuestSocialIsolation>}

                                    />
                                )
                            }
                            {
                                majorProblem === "other" && (
                                    <Route
                                        path="daily-quest"
                                        element={<DailyQuest></DailyQuest>}

                                    />
                                )
                            }

                            <Route
                                path="daily-quest"
                                element={<DailyQuest></DailyQuest>}> </Route>


                            <Route
                                path="aboutUs"
                                element={<AboutUs />}
                            />
                            <Route
                                path="problem"
                                element={<ProblemDropdown />}
                            />
                            <Route
                                path="doctors"
                                element={<DoctorList />}
                            />
                            <Route
                                path="question"
                                element={<Question />}
                            />
                            <Route
                                path="chat-ai"
                                element={<ChatAI></ChatAI>}>
                            </Route>
                            <Route
                                path="get-premium"
                                element={<Pricing></Pricing>}>
                            </Route>
                            <Route
                                path="specialists"
                                element={<DoctorList></DoctorList>}>
                            </Route>
                            <Route
                                path="add-journal"
                                element={<Journal></Journal>}>
                            </Route>
                            <Route
                                path="adhd-confirmation"
                                element={<ConfirmationADHD></ConfirmationADHD>}>
                            </Route>
                            <Route
                                path="mental-illness-confirmation"
                                element={<MentalIllness></MentalIllness>}>
                            </Route>
                            <Route
                                path="fundraisings"
                                element={<Fundraisings></Fundraisings>}>
                            </Route>
                            <Route
                                path="add-fundraising"
                                element={<AddFundraisingForm></AddFundraisingForm>}>
                            </Route>
                            <Route
                                path="fundraisings/:id"
                                element={<SpecificFundraisings></SpecificFundraisings>}>
                            </Route>
                            <Route
                                path="add-specialist"
                                element={<AddSpecialistForm></AddSpecialistForm>}>
                            </Route>

                            <Route
                                path="*"
                                element={<div>404 PAGE</div>}
                            />
                        </>
                        :
                        <>
                            <Route index element={<HomePageNew></HomePageNew>} />
                            <Route
                                path="aboutUs"
                                element={<AboutUs />}
                            />
                            <Route
                                path="register"
                                element={<Signup></Signup>}
                            />
                            <Route
                                path="login"
                                element={<Login></Login>}
                            />
                            <Route
                                path="doctor-login"
                                element={<DoctorLogin></DoctorLogin>}
                            />
                            <Route
                                path="*"
                                element={<div>404 PAGE</div>}
                            />
                        </>
                }

            </Routes>
        </div >
    );
};

export default MyRoutes;
