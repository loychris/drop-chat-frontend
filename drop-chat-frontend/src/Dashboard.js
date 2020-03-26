import React from 'react';
import classes from './Dashboard.module.css';
import {CTX} from './Store';

export default function Dashboard() {


    //CTX store
    const {allChats, sendChatAction, user} = React.useContext(CTX);

    console.log(allChats);

    const topics = Object.keys(allChats);

    // local State
    const [activeTopic, changeActiveTopic] = React.useState(topics[0]);
    const [ textValue, changeTextValue ] = React.useState('');

    

    return(
        <div className={classes.Dashboard}>
            <h1>Chat App</h1>
            <h2>{activeTopic}</h2>
            <div className={classes.flex}>
                <div className={classes.topicsWindow}>
                    <div className={classes.List}>
                        {
                            topics.map(topic => (
                                <div key={topic} onClick={event => changeActiveTopic(event.target.innerText)} className={classes.ListItem}>
                                    {topic}
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className={classes.chatWindow}>
                    {
                        allChats[activeTopic].map((chat, i) => (
                            <div className={classes.flex} key={i}>
                                <div>From:{chat.from} MSG: {chat.msg}</div>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className={classes.flex}>
                <div className={classes.chatBox}>
                    <input type='text' onChange={event => changeTextValue(event.target.value)}/>
                </div>
                <div className={classes.button}>
                    <button onClick={() => {
                        sendChatAction({from: user, msg: textValue, topic: activeTopic});
                        changeTextValue(' ');
                    }}>
                        SEND
                    </button>
                </div>
            </div>
        </div>
    )
}