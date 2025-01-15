// import React, { useEffect } from 'react';
// import { memo } from 'react';
// import logo from 'assets/img/logo.png';

// const Chatbot = () => {
//     useEffect(() => {
//         const script = document.createElement('script');
//         script.src = 'https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1';
//         script.async = true;
//         document.body.appendChild(script);

//         return () => {
//             document.body.removeChild(script);
//         };
//     }, []);

//     return (
//         <df-messenger
//             intent="WELCOME"
//             chat-title="E-commerce-chatbot"
//             agent-id="ef402d03-902b-4193-bbd8-3dde1b5c9f34"
//             language-code="en"
//         ></df-messenger>
//     );
// };

// export default memo(Chatbot);

// import React, { useEffect, useState } from 'react';
// import { memo } from 'react';
// import logo from 'assets/img/logo.png';

// const Chatbot = () => {
//     const [products, setProducts] = useState([]);

//     useEffect(() => {
//         const script = document.createElement('script');
//         script.src = 'https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1';
//         script.async = true;
//         document.body.appendChild(script);

//         window.addEventListener('dfMessengerResponse', (event) => {
//             const data = event.detail.response;
//             if (data.fulfillmentMessages && data.fulfillmentMessages[0].payload) {
//                 setProducts(data.fulfillmentMessages[0].payload.richContent);
//             }
//         });

//         return () => {
//             document.body.removeChild(script);
//             window.removeEventListener('dfMessengerResponse', () => {});
//         };
//     }, []);

//     return (
//         <div>
//             <df-messenger
//                 intent="WELCOME"
//                 chat-title="E-commerce-chatbot"
//                 agent-id="ef402d03-902b-4193-bbd8-3dde1b5c9f34"
//                 language-code="en"
//             ></df-messenger>
//             <div>
//                 {products.length > 0 &&
//                     products.map((product, index) => (
//                         <div key={index}>
//                             <h3>{product.title}</h3>
//                             <p>{product.subtitle}</p>
//                             <a href={product.event.link}>View Details</a>
//                         </div>
//                     ))}
//             </div>
//         </div>
//     );
// };

// export default memo(Chatbot);

// import React, { useEffect, useState } from 'react';
// import { memo } from 'react';
// import { apiGetProducts } from 'apis';
// // const apiGetProducts = (params) => axios({ url: '/api/product', method: 'get', params });
// const Chatbot = () => {
//     const [products, setProducts] = useState([]);
//     useEffect(() => {
//         const script = document.createElement('script');
//         script.src = 'https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1';
//         script.async = true;
//         document.body.appendChild(script);
//         window.addEventListener('dfMessengerResponse', async (event) => {
//             console.log('Received response:', event.detail.response);
//             const data = event.detail.response;
//             if (data.fulfillmentMessages && data.fulfillmentMessages[0].payload) {
//                 const params = { color: 'white' };
//                 try {
//                     const response = await apiGetProducts(params);
//                     setProducts(response.data);
//                 } catch (error) {
//                     console.error('Error fetching products:', error);
//                 }
//             }
//         });
//         return () => {
//             document.body.removeChild(script);
//             window.removeEventListener('dfMessengerResponse', () => {});
//         };
//     }, []);
//     return (
//         <div>
//             <df-messenger
//                 intent="WELCOME"
//                 chat-title="E-commerce-chatbot"
//                 agent-id="ef402d03-902b-4193-bbd8-3dde1b5c9f34"
//                 language-code="en"
//             ></df-messenger>
//             <div>
//                 {products.length > 0 &&
//                     products.map((product, index) => (
//                         <div key={index}>
//                             <h3>{product.title}</h3> <p>{product.subtitle}</p>
//                             <a href={product.event.link}>View Details</a>
//                         </div>
//                     ))}
//             </div>
//         </div>
//     );
// };
// export default memo(Chatbot);

// import React, { useEffect, useState } from 'react';
// import { memo } from 'react';

// const Chatbot = () => {
//     const [products, setProducts] = useState([]);

//     useEffect(() => {
//         const script = document.createElement('script');
//         script.src = 'https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1';
//         script.async = true;
//         document.body.appendChild(script);

//         const handleMessengerResponse = (event) => {
//             console.log('Received response:', event.detail.response);
//             const data = event.detail.response;

//             // Kiểm tra xem phản hồi có chứa richContent không
//             if (data.fulfillmentMessages && data.fulfillmentMessages[0]?.payload?.richContent) {
//                 const richContent = data.fulfillmentMessages[0].payload.richContent;
//                 setProducts(richContent);
//             }
//         };

//         window.addEventListener('dfMessengerResponse', handleMessengerResponse);

//         return () => {
//             document.body.removeChild(script);
//             window.removeEventListener('dfMessengerResponse', handleMessengerResponse);
//         };
//     }, []);

//     return (
//         <div>
//             <df-messenger
//                 intent="WELCOME"
//                 chat-title="E-commerce-chatbot"
//                 agent-id="ef402d03-902b-4193-bbd8-3dde1b5c9f34"
//                 language-code="en"
//             ></df-messenger>
//             <div>
//                 {products.length > 0 &&
//                     products.map((product, index) => (
//                         <div key={index}>
//                             <h3>{product.title}</h3>
//                             <p>{product.subtitle}</p>
//                             <a href={product.event.link} target="_blank" rel="noopener noreferrer">
//                                 View Details
//                             </a>
//                         </div>
//                     ))}
//             </div>
//         </div>
//     );
// };

// export default memo(Chatbot);

//cái này ổn nhất
// import React, { useEffect, useState } from 'react';
// import { memo } from 'react';

// const Chatbot = () => {
//     const [products, setProducts] = useState([]);

//     useEffect(() => {
//         const script = document.createElement('script');
//         script.src = 'https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1';
//         script.async = true;
//         document.body.appendChild(script);

//         window.addEventListener('dfMessengerResponse', async (event) => {
//             console.log('Received response:', event.detail.response);
//             const data = event.detail.response;

//             if (data.fulfillmentMessages && data.fulfillmentMessages[0].payload) {
//                 console.log('Payload:', data.fulfillmentMessages[0].payload);
//                 setProducts(data.fulfillmentMessages[0].payload.richContent[0]);
//             }
//         });

//         return () => {
//             document.body.removeChild(script);
//             window.removeEventListener('dfMessengerResponse', () => {});
//         };
//     }, []);

//     return (
//         <div>
//             <df-messenger
//                 intent="WELCOME"
//                 chat-title="E-commerce-chatbot"
//                 agent-id="ef402d03-902b-4193-bbd8-3dde1b5c9f34"
//                 language-code="en"
//             ></df-messenger>
//             <div>
//                 {products.length > 0 &&
//                     products.map((product, index) => (
//                         <div key={index}>
//                             <h3>{product.title}</h3>
//                             <p>{product.subtitle}</p>
//                             <a href={product.event.link}>View Details</a>
//                         </div>
//                     ))}
//             </div>
//         </div>
//     );
// };

// export default memo(Chatbot);

// import React, { useEffect, useState } from 'react';
// import { memo } from 'react';

// const Chatbot = () => {
//     const [products, setProducts] = useState([]);

//     useEffect(() => {
//         const script = document.createElement('script');
//         script.src = 'https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1';
//         script.async = true;
//         document.body.appendChild(script);

//         window.addEventListener('dfMessengerResponse', async (event) => {
//             console.log('Received response:', event.detail.response);
//             const data = event.detail.response;

//             if (data.fulfillmentMessages && data.fulfillmentMessages[0].payload) {
//                 console.log('Payload:', data.fulfillmentMessages[0].payload);
//                 const richContent = data.fulfillmentMessages[0].payload.richContent;

//                 // Chuyển đổi payload richContent thành định dạng phù hợp
//                 const productsList = richContent[0].items.map((item) => ({
//                     title: item.title,
//                     subtitle: item.subtitle,
//                     link: item.event.link,
//                 }));

//                 setProducts(productsList);
//             }
//         });

//         return () => {
//             document.body.removeChild(script);
//             window.removeEventListener('dfMessengerResponse', () => {});
//         };
//     }, []);

//     return (
//         <div>
//             <df-messenger
//                 intent="WELCOME"
//                 chat-title="E-commerce-chatbot"
//                 agent-id="ef402d03-902b-4193-bbd8-3dde1b5c9f34"
//                 language-code="en"
//             ></df-messenger>
//             <div>
//                 {products.length > 0 &&
//                     products.map((product, index) => (
//                         <div key={index}>
//                             <h3>{product.title}</h3>
//                             <p>{product.subtitle}</p>
//                             <a href={product.link}>View Details</a>
//                         </div>
//                     ))}
//             </div>
//         </div>
//     );
// };

// export default memo(Chatbot);

// import React, { useEffect, useState } from 'react';
// import { memo } from 'react';
// import logo from 'assets/img/logo.png';

// const Chatbot = () => {
//     const [products, setProducts] = useState([]);

//     useEffect(() => {
//         const existingScript = document.getElementById('df-messenger-script');
//         if (!existingScript) {
//             const script = document.createElement('script');
//             script.src = 'https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1';
//             script.id = 'df-messenger-script';
//             script.async = true;
//             document.body.appendChild(script);
//         }

//         window.addEventListener('dfMessengerResponse', async (event) => {
//             const data = event.detail.response;
//             if (data.fulfillmentMessages && data.fulfillmentMessages[0].payload) {
//                 const richContent = data.fulfillmentMessages[0].payload.richContent;
//                 const productsList = richContent[0].items.map((item) => ({
//                     title: item.title,
//                     subtitle: item.subtitle,
//                     link: item.event.link,
//                 }));
//                 setProducts(productsList);
//             }
//         });

//         return () => {
//             document.body.removeChild(existingScript);
//             window.removeEventListener('dfMessengerResponse', () => {});
//         };
//     }, []);
//     return (
//         <div>
//             <df-messenger
//                 intent="WELCOME"
//                 chat-title="E-commerce-chatbot"
//                 agent-id="ef402d03-902b-4193-bbd8-3dde1b5c9f34"
//                 language-code="en"
//             ></df-messenger>
//             <div>
//                 {products.length > 0 &&
//                     products.map((product, index) => (
//                         <div key={index}>
//                             <h3>{product.title}</h3>
//                             <p dangerouslySetInnerHTML={{ __html: product.subtitle }}></p>
//                             <a href={product.link}>View Details</a>
//                         </div>
//                     ))}
//             </div>
//         </div>
//     );
// };

// export default memo(Chatbot);

import React, { useEffect, useState } from 'react';
import { memo } from 'react';
import logo from 'assets/img/logo.png';

const Chatbot = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // const existingScript = document.getElementById('df-messenger-script');
        // if (!existingScript) {
        //     const script = document.createElement('script');
        //     script.src = 'https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1';
        //     script.id = 'df-messenger-script';
        //     script.async = true;
        //     document.body.appendChild(script);
        // }
        const existingScript = document.getElementById('df-messenger-script');
        if (!existingScript) {
            const script = document.createElement('script');
            script.src = 'https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1';
            script.id = 'df-messenger-script';
            script.async = true;
            script.onload = () => console.log('Dialogflow script loaded'); // Kiểm tra khi script tải thành công
            script.onerror = (err) => console.error('Error loading Dialogflow script:', err); // Kiểm tra lỗi khi tải script
            document.body.appendChild(script);
        }
        const handleResponse = async (event) => {
            console.log('Event received:', event);
            const data = event.detail.response;
            console.log('Dialogflow response:', data);
            if (data.fulfillmentMessages && data.fulfillmentMessages[0].payload) {
                const richContent = data.fulfillmentMessages[0].payload.richContent;
                console.log('Rich content:', richContent);
                if (richContent && richContent[0] && richContent[0].items) {
                    const productsList = richContent[0].items.map((item) => ({
                        title: item.title,
                        subtitle: item.subtitle,
                        link: item.event.link,
                    }));
                    console.log('Products list:', productsList);
                    setProducts(productsList);
                }
            }
        };
        window.addEventListener('dfMessengerResponse', handleResponse);
        console.log('Event listener added'); // Kiểm tra nếu listener đã được thêm vào

        return () => {
            const existingScript = document.getElementById('df-messenger-script');
            if (existingScript) {
                document.body.removeChild(existingScript);
            }
            window.removeEventListener('dfMessengerResponse', handleResponse);
            console.log('Event listener removed'); // Kiểm tra nếu listener đã được xóa
        };
    }, []);

    useEffect(() => {
        console.log('Products:', products); // Kiểm tra state products
    }, [products]);

    const handleLinkClick = (url) => {
        window.open(url, '_blank');
    };

    return (
        <div>
            <df-messenger
                intent="WELCOME"
                chat-title="E-commerce-chatbot"
                agent-id="ef402d03-902b-4193-bbd8-3dde1b5c9f34"
                language-code="en"
            ></df-messenger>
            <div id="product-container">
                {products.length > 0 ? (
                    products.map((product, index) => (
                        <div key={index}>
                            <h3>{product.title}</h3>
                            {/* <p dangerouslySetInnerHTML={{ __html: product.subtitle }}></p> */}
                            <p>{product.subtitle}</p>
                            {/* <a href={product.link}>View Details</a> */}
                            <button onClick={() => handleLinkClick(product.link)}>View Details</button>{' '}
                        </div>
                    ))
                ) : (
                    // <p>No products found.</p>
                    ''
                )}
            </div>
        </div>
    );
};

export default memo(Chatbot);
