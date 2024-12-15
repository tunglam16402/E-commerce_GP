import React from 'react';
import background from '../../assets/img/login_background.avif';

const Login = () => {
    return (
        <div className="w-srceen h-screen relative">
            <img
                src="https://wallpapercave.com/wp/wp3537545.jpg"
                alt="login-background"
                className="w-full object-cover"
            ></img>
            <div className="absolute top-0 bottom-0 left-0 right-1/2 flex items-center justify-center">
                <div className="p-8 bg-white rounded-md min-w-[500px] ">Login</div>
            </div>
        </div>
    );
};

export default Login;
