import React from "react";
//라우팅에 사용할 라이브러리
import { Routes, Route} from "react-router-dom"
import App from "../App";
import Header from "../components/Header";
import Login from "../components/Login";
import Join from "../components/Join";

const AppRouter = () => {

    return (
        <>
            <Header />
            <Routes>
                {/* '/' 경로로 요청하면 App 컴포넌트를 렌더링하세요 */}
                <Route path="/" element={<App />}/>
                {/* '/login' 경로로 요청하면 Login 컴포넌트를 렌더링하세요 */}
                <Route path="/login" element={<Login />}/>
                {/* '/join' 경로로 요청하면 Login 컴포넌트를 렌더링하세요 */}
                <Route path="/join" element={<Join />}/>
            </Routes>
        </>
    );

};

export default AppRouter;