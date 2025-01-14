import React, { useEffect } from 'react';
import { memo } from 'react';
import logo from 'assets/img/logo.png';

const Chatbot = () => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1';
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <df-messenger
            intent="WELCOME"
            chat-title="E-commerce-chatbot"
            agent-id="ef402d03-902b-4193-bbd8-3dde1b5c9f34"
            language-code="en"
            chat-icon={logo}
            bot-avatar=""
            user-avatar=""
        ></df-messenger>
    );
};

export default memo(Chatbot);
